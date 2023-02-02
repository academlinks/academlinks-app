import { Link } from "react-router-dom";

import styles from "./styles/conversationInfoBox.module.scss";
import { TimeAgo } from "../../Layouts";

function ConversationInfoBox({
  userName,
  lastMessage,
  lastMessagePrefix,
  userId,
}) {
  const last = lastMessage.message?.includes("</br>")
    ? lastMessage.message.replaceAll("</br>", " ")
    : lastMessage.message;

  return (
    <div className={styles.infoBox}>
      <Link
        to={userId ? `/profile/${userId}/posts` : ""}
        className={styles.conversationAuthor}
      >
        {userName}
      </Link>

      <div className={styles.miniBox}>
        <p className={styles.conversationLastMessage}>
          {lastMessagePrefix ? <span>you: </span> : ""}
          {lastMessage?.message?.length > 12
            ? `${last.substring(0, 12)}...`
            : last}
        </p>
        <TimeAgo
          className={styles.conversationDate}
          date={lastMessage?.createdAt}
        />
      </div>
    </div>
  );
}

export default ConversationInfoBox;
