import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import styles from "./Contact.module.css";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.contactCard}>
      <div className={styles.card}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.number}>{number}</p>
        <button
          className={styles.deleteBtn}
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
