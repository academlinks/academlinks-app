import styles from './requestBtn.module.scss';
import { CancelFriendRequestIcon } from '../Icons/icons';

function CancelRequestBTN({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.cancelBtn}`} data-req-btn onClick={onClick}>
      <CancelFriendRequestIcon />
      <span>cancel request</span>
    </button>
  );
}

export default CancelRequestBTN;
