import { useEffect, useRef } from "react";

import styles from "./styles/feedMessagesList.module.scss";
import Message from "./Message";
import { formatDate } from "../../../lib";

function FeedMessagesList({
  groupedMessages,
  adressat,
  activeUserId,
  lastMessage,
}) {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [groupedMessages]);

  return (
    <div className={styles.feedContentBox} ref={containerRef}>
      {groupedMessages.map((msgGroup, i) => {
        return msgGroup[0].startDate ? (
          <p className={styles.dateDevider}>
            {formatDate(msgGroup[0].startDate, "verbalWithHours")}
          </p>
        ) : (
          <Message
            key={`message ${i}`}
            msgGroup={msgGroup}
            activeUserId={activeUserId}
            adressatImage={adressat.profileImg}
          />
        );
      })}
      {lastMessage?.isRead && lastMessage?.author === activeUserId && (
        <span className={styles.isReadLabel}>read</span>
      )}
    </div>
  );
}

export default FeedMessagesList;
