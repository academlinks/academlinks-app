import { BTN } from "components/Layouts";
import styles from "./styles/updateUserCoverBtn.module.scss";

function UpdateUserCoverBTN({ cancelHandler, submitHandler }) {
  return (
    <div className={styles.updateUserCoverBtn}>
      <BTN onClick={cancelHandler} className={styles.cancelUpdateBtn}>
        cancel
      </BTN>
      <BTN onClick={submitHandler}>save</BTN>
    </div>
  );
}

export default UpdateUserCoverBTN;
