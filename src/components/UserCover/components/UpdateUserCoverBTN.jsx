import styles from "./styles/updateUserCoverBtn.module.scss";
import { BTN } from "../../Layouts";

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
