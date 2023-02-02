import styles from "./deletionPopUp.module.scss";
import { BTN } from "../../Layouts";

function DeletionPopUp({ setDeletion, deleteHandler, keyWord, className }) {
  return (
    <div className={styles.confirmationPopUp}>
      <p
        className={styles.message}
      >{`are you sure you want to delete this ${keyWord} ?`}</p>
      <BTN
        className={`${styles.btn} ${styles.btnCancel}`}
        onClick={() => setDeletion(false)}
      >
        cancel
      </BTN>
      <BTN
        className={`${styles.btn} ${styles.btnDelete}`}
        onClick={deleteHandler}
      >
        delete
      </BTN>
    </div>
  );
}

export default DeletionPopUp;
