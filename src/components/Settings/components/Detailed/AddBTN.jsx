import { BTN } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function AddBTN({ label, onClick = () => {} }) {
  return (
    <BTN className={styles.addBTN} onClick={onClick}>
      add {label}
    </BTN>
  );
}

export default AddBTN;
