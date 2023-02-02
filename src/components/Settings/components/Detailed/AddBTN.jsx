import styles from "../styles/detailed.module.scss";

function AddBTN({ label, onClick = () => {} }) {
  return (
    <button className={styles.addBTN} onClick={onClick}>
      add {label}
    </button>
  );
}

export default AddBTN;
