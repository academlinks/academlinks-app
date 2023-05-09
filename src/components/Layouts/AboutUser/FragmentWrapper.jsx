import styles from "./styles/fragmentWrapper.module.scss";
import { EditIcon, DeleteIcon } from "components/Layouts/Icons";

function FragmentWrapper({
  icon,
  children,
  editable,
  onEdit,
  deleteAble,
  onDelete,
}) {
  return (
    <div className={styles.fragmentWrapper}>
      <span className={styles.fragmentIcon}>{icon}</span>
      <div
        className={`${styles.fragmentChildren} ${
          editable ? styles.isEditable : ""
        }`}
      >
        {children}
      </div>
      {editable && (
        <div className={styles.fragmentBtnsBox}>
          {deleteAble && (
            <button
              className={`${styles.editableBtn} ${styles.editableDeleteBtn}`}
              onClick={onDelete}
            >
              <DeleteIcon />
            </button>
          )}
          <button className={styles.editableBtn} onClick={onEdit}>
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default FragmentWrapper;
