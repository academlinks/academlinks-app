import Modal from "react-modal";

import { useRestrictBodyOverflow } from "hooks/util";

import { CloseIcon } from "components/Layouts/Icons";
import styles from "./modal.module.scss";

Modal.setAppElement("#root");

function Modall({ children, className, modalClassName, isOpen, setIsOpen }) {
  const { restrictScroll } = useRestrictBodyOverflow(isOpen, true);

  function closeModal() {
    restrictScroll(false);
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`${styles.modal} ${modalClassName || ""}`}
      overlayClassName={styles.modalOverlay}
    >
      <div className={`${styles.modalContent} ${className || ""}`}>
        {children}
        <button
          className={styles.modalCloseBtn}
          onClick={closeModal}
          data-modal-close-btn
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
}

export default Modall;
