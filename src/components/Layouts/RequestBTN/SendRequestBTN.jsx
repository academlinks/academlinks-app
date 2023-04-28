import { AddToFriendsIcon } from 'components/Layouts/Icons';
import styles from './requestBtn.module.scss';

function SendRequestBTN({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.sendBtn}`} onClick={onClick}>
      <AddToFriendsIcon /> <span>send request</span>
    </button>
  );
}

export default SendRequestBTN;
