import React from "react";
import styles from "./Loader.module.css"; // Подключаем модульные стили

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
