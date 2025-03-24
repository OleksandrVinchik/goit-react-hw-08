import styles from "./Contact.module.css";

export default function Contact({ id, name, number, onDelete }) {
  return (
    <li className={styles.contactCard}>
      <div className={styles.card}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.number}>{number}</p>
        <button className={styles.deleteBtn} onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
