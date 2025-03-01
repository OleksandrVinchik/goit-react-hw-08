import styles from "./SearchBox.module.css";

export default function SearchBox({ value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <label>
        Find contacts by name:
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
