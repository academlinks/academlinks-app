import { SpinnerIcon } from "components/Layouts/Icons";
import styles from "./spinner.module.scss";

function BlockSpinner() {
  return (
    <div className={styles.blockSpinnerBox}>
      <SpinnerIcon className={styles.spinner} />
    </div>
  );
}

export default BlockSpinner;
