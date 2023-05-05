import { EmailIcon } from 'components/Layouts/Icons';
import styles from './requestBtn.module.scss';

function SendMessageBTN({ onClick }) {
  return (
    <button className={`${styles.requestBtn} ${styles.sendMessageBtn}`} onClick={onClick}>
      <EmailIcon /> <span>send message</span>
    </button>
  );
}

export default SendMessageBTN;
