import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import styles from "./App.module.css";

export default function App() {
  // Ініціалізація стану: отримання контактів із localStorage або стандартний список
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      return JSON.parse(savedContacts); // Якщо є контакти в localStorage, повертаємо їх
    } else {
      const defaultContacts = [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ];
      // Якщо контактів немає в localStorage, зберігаємо стандартні контакти
      localStorage.setItem("contacts", JSON.stringify(defaultContacts));
      return defaultContacts;
    }
  });

  // Стан для поля пошуку
  const [filter, setFilter] = useState("");

  // Збереження контактів у localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Функція додавання нового контакту
  const addContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} вже є в списку контактів!`);
      return;
    }

    const contactWithId = { ...newContact, id: nanoid() };
    setContacts((prevContacts) => [...prevContacts, contactWithId]);
  };

  // Функція видалення контакту за id
  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  // Оновлення стану фільтра
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Фільтрований список контактів
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
