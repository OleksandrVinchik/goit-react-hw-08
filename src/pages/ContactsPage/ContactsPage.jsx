import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
  addContact,
  updateContact,
} from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import { selectFilter } from "../../redux/filters/selectors";
import { setFilter } from "../../redux/filters/slice";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts) || [];
  const filter = useSelector(selectFilter) || "";
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteContact(deleteId)).unwrap();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact!");
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!editContact) return;
    try {
      await dispatch(updateContact(editContact)).unwrap();
      toast.success("Contact updated successfully!");
    } catch (error) {
      toast.error("Failed to update contact!");
    }
    setShowEditModal(false);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();
    if (!name || !number) {
      toast.error("Please fill in all fields!");
      return;
    }
    try {
      await dispatch(addContact({ name, number })).unwrap();
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error("Failed to add contact!");
    }
    form.reset();
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value || ""));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <div className={styles.contactsContainer}>
      <Toaster position="top-right" />
      <h1 className={styles.title}>Contacts</h1>
      <form onSubmit={handleAddContact} className={styles.addContactForm}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          name="number"
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Contact
        </Button>
      </form>
      <TextField
        label="Search by name or number..."
        variant="outlined"
        fullWidth
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredContacts.length > 0 ? (
        <ul className={styles.contactsList}>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <span>
                {contact.name}: {contact.number}
              </span>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEdit(contact)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noContactsMessage}>Контакти не знайдено</p>
      )}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this contact?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {editContact && (
        <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={editContact.name}
              onChange={(e) =>
                setEditContact({ ...editContact, name: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={editContact.number}
              onChange={(e) =>
                setEditContact({ ...editContact, number: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactsPage;
