import { CancelFriendRequestIcon } from "components/Layouts/Icons";
import styles from "./requestBtn.module.scss";

function CancelRequestBTN({ onClick }) {
  return (
    <button
      className={`${styles.requestBtn} ${styles.cancelBtn}`}
      data-req-btn
      onClick={onClick}
    >
      <CancelFriendRequestIcon />
      <span>cancel request</span>
    </button>
  );
}

export default CancelRequestBTN;
