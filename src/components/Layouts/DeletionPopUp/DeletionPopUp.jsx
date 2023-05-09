import { BTN, BlockSpinner } from "components/Layouts";
import styles from "./deletionPopUp.module.scss";

function DeletionPopUp({
  setDeletion,
  deleteHandler,
  keyWord,
  message,
  showButtons = true,
  showSpinner,
}) {
  return (
    <div className={styles.confirmationPopUp}>
      <p className={styles.message}>
        {message
          ? message
          : `are you sure you want to delete this ${keyWord} ?`}
      </p>
      {showSpinner && <BlockSpinner />}
      {showButtons && (
        <div className={styles.btnBox}>
          <BTN btnType="secondaryRadial" onClick={() => setDeletion(false)}>
            cancel
          </BTN>
          <BTN btnType="deleteRadial" onClick={deleteHandler}>
            delete
          </BTN>
        </div>
      )}
    </div>
  );
}

export default DeletionPopUp;
