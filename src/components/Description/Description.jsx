import styles from "./Description.module.css";

export default function Description({ title, text }) {
  return (
    <div className={styles.descriptionContainer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
