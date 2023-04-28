import { SpinnerIcon } from "components/Layouts/Icons";
import styles from "./spinner.module.scss";

function Spinner({ className }) {
  return (
    <div className={`${styles.spinnerBox} ${className || ""}`}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default Spinner;
