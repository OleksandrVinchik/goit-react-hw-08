import styles from "./Options.module.css";

export default function Options({ onLeaveFeedback, onReset, hasFeedback }) {
  return (
    <div className={styles.optionsContainer}>
      <button className={styles.button} onClick={() => onLeaveFeedback("good")}>
        Good
      </button>
      <button
        className={styles.button}
        onClick={() => onLeaveFeedback("neutral")}
      >
        Neutral
      </button>
      <button className={styles.button} onClick={() => onLeaveFeedback("bad")}>
        Bad
      </button>
      {hasFeedback && (
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
