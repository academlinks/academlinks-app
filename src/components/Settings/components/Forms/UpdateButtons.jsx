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
        btnType="secondaryRadial"
        onClick={(e) => {
          e.preventDefault();
          cancelHandler();
        }}
      >
        cancel
      </BTN>
      <BTN
        type={updaterType}
        btnType="primaryRadial"
        {...(updaterType !== "submit"
          ? {
              onClick: (e) => {
                e.preventDefault();
                updateHandler && updateHandler();
              },
            }
          : {})}
      >
        update
      </BTN>
    </div>
  );
}

export default UpdateButtons;
