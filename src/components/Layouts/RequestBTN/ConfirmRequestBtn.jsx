import { ConfirmFriendRequestIcon } from 'components/Layouts/Icons';
import styles from './requestBtn.module.scss';

function ConfirmRequestBtn({ onClick }) {
  return (
    <button className={`${styles.requestBtn} ${styles.confirmBtn}`} data-req-btn onClick={onClick}>
      <ConfirmFriendRequestIcon /> <span>confirm request</span>
    </button>
  );
}

export default ConfirmRequestBtn;
