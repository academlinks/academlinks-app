import styles from "./input.module.scss";

function InputLabel({ id, labelTitle, label, anotation, focus }) {
  return (
    <label htmlFor={id} className={styles.inputLabel} title={labelTitle}>
      {label}
      {anotation && (
        <span className={`${styles.anotation} ${focus ? styles.active : ""}`}>
          {anotation}
        </span>
      )}
    </label>
  );
}

export default InputLabel;
