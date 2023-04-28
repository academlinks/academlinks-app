import { useState } from 'react';

import { FriendIcon, ArrowDownRectingle, DeleteFriendIcon } from 'components/Layouts/Icons';
import styles from './requestBtn.module.scss';

function IsFriendBTN({ deleteHanlder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.requestBtnBox}>
      <button
        className={`${styles.btn} ${styles.isFriendBtn}`}
        onClick={() => setOpen((prev) => !prev)}>
        <FriendIcon /> <span>friend</span> <ArrowDownRectingle />
      </button>
      {open && (
        <div className={styles.requestBtnModal}>
          <button
            className={`${styles.btn} ${styles.deleteFromFriendsBtn}`}
            onClick={() => {
              deleteHanlder();
              setOpen(false);
            }}>
            <DeleteFriendIcon /> delete from friends
          </button>
        </div>
      )}
    </div>
  );
}

export default IsFriendBTN;
