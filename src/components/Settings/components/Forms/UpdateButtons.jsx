import styles from "../styles/detailed.module.scss";

function UpdateButtons({
  updateHandler,
  cancelHandler,
  updaterType = "button",
}) {
  return (
    <div className={styles.updateBtnBox}>
      <button
        onClick={(e) => {
          e.preventDefault();
          cancelHandler();
        }}
        className={styles.cancelBtn}
      >
        cancel
      </button>
      <button
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
      </button>
    </div>
  );
}

export default UpdateButtons;
