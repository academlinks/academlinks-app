import styles from "./spinner.module.scss";
import { SpinnerIcon } from "../../Layouts/Icons/icons";

function Spinner({ className }) {
  return (
    <div className={`${styles.spinnerBox} ${className || ""}`}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default Spinner;
