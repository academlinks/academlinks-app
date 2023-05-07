import { useState } from "react";

import {
  DotsHorizontalIcon,
  DeleteIcon,
  ReadIcon,
} from "components/Layouts/Icons";
import { TimeAgo, Avatar } from "components/Layouts";
import styles from "./styles/notificationBody.module.scss";

function NotificationBody({
  notify,
  handleNavigate,
  activeNotification,
  setActiveNotification,
  handleMarkAsRead,
  handleDeleteNotify,
}) {
  const [activeNotifyModal, setActiveNotifyModal] = useState(false);

  const activateNotifyOpt = (e) => {
    e.stopPropagation();
    setActiveNotification(notify._id);
    setActiveNotifyModal((prev) => !prev);
  };

  function showNotificationMessage(notify) {
    if (notify.target?.options?.postAuthorUserName) {
      const message = notify.message.split(`${"PostAuthorPlaceholder"}`);
      return (
        <>
          <strong className={styles.userName}>{notify.from?.userName}</strong>
          &nbsp;
          <span>{message[0]}</span>&nbsp;
          <strong>{notify.target.options.postAuthorUserName}</strong>
          <span>{message[1]}</span>
        </>
      );
    } else
      return (
        <>
          <strong className={styles.userName}>
            {notify.isDeletedSender
              ? notify.isDeletedSender.cachedUserName
              : notify.from.userName}
          </strong>{" "}
          <span>{notify.message}</span>
        </>
      );
  }

  return (
    <div
      className={`${styles.notifyBody} ${notify.read ? "" : styles.unRead}`}
      onClick={() => handleNavigate(notify)}
    >
      <Avatar img={notify.from.profileImg} />
      <p>
        {showNotificationMessage(notify)}
        <TimeAgo date={notify.createdAt} className={styles.notifyTime} />
      </p>
      <div className={styles.notifyPopUpBox}>
        <button onClick={activateNotifyOpt}>
          <DotsHorizontalIcon />
        </button>
        {activeNotifyModal && activeNotification === notify._id && (
          <div className={styles.notifyOptionsList}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notify._id);
                setActiveNotifyModal(false);
              }}
            >
              <ReadIcon />
              mark as read
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotify(notify._id);
                setActiveNotifyModal(false);
              }}
            >
              <DeleteIcon />
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationBody;
