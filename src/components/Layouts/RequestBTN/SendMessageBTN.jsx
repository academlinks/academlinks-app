import styles from './requestBtn.module.scss';
import { EmailIcon } from '../Icons/icons';

function SendMessageBTN({ onClick }) {
  return (
    <button className={`${styles.btn} ${styles.sendMessageBtn}`} onClick={onClick}>
      <EmailIcon /> <span>send message</span>
    </button>
  );
}

export default SendMessageBTN;
