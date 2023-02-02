import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectActiveUserId } from "../../../store/selectors/activeUserSelectors";

import styles from "./styles/conversation.module.scss";
import { Avatar } from "../../Layouts";
import ConversationInfoBox from "./ConversationInfoBox";
import ConversationOptions from "./ConversationOptions";

function Conversation({ conversationId, adressatId, author, lastMessage }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const activeUserId = useSelector(selectActiveUserId);

  const [openConversationOption, setOpenConversationOption] = useState(false);

  function handleNavigateToConversation() {
    navigate(conversationId);
  }

  return (
    <div
      onClick={() => handleNavigateToConversation()}
      onMouseLeave={() =>
        openConversationOption && setOpenConversationOption(false)
      }
      className={`${styles.conversationBox} ${
        conversationId === id && styles.activeConversationBox
      } ${
        !lastMessage?.isRead &&
        lastMessage?.author !== activeUserId &&
        styles.unRead
      }`}
      data-conversation-box
    >
      <Avatar img={author.profileImg} />
      <ConversationInfoBox
        userName={author.userName || author.cachedUserName}
        lastMessage={lastMessage}
        lastMessagePrefix={lastMessage?.author === activeUserId}
        userId={adressatId}
      />
      <span className={styles.unReadDot}></span>
      <ConversationOptions
        openConversationOption={openConversationOption}
        setOpenConversationOption={setOpenConversationOption}
        conversationId={conversationId}
        adressatId={adressatId}
      />
    </div>
  );
}

export default Conversation;
