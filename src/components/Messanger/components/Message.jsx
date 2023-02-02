import styles from './styles/message.module.scss';
import ChatMessage from './ChatMessage';

function Message({ msgGroup, activeUserId, adressatImage }) {
  return (
    <div className={styles.messageBox}>
      <ChatMessage msgGroup={msgGroup} activeUserId={activeUserId} adressatImage={adressatImage} />
    </div>
  );
}

export default Message;
