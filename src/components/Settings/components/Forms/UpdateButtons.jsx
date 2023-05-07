import { BTN } from "components/Layouts";
import styles from "../styles/detailed.module.scss";

function UpdateButtons({
  updateHandler,
  cancelHandler,
  updaterType = "button",
}) {
  return (
    <div className={styles.updateBtnBox}>
      <BTN
        onClick={(e) => {
          e.preventDefault();
          cancelHandler();
        }}
        className={styles.cancelBtn}
      >
        cancel
      </BTN>
      <BTN
        {...(updaterType !== "submit"
          ? {
              onClick: (e) => {
                e.preventDefault();
                updateHandler && updateHandler();
              },
            }
          : {})}
        className={styles.updateBtn}
        type={updaterType}
      >
        update
      </BTN>
    </div>
  );
}

export default UpdateButtons;
