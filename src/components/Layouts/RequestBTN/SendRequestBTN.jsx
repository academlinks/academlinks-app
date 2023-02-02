import styles from './requestBtn.module.scss';
import { AddToFriendsIcon } from '../Icons/icons';

function SendRequestBTN({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.sendBtn}`} onClick={onClick}>
      <AddToFriendsIcon /> <span>send request</span>
    </button>
  );
}

export default SendRequestBTN;
