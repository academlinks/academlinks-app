/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  selectActiveConversation,
  selectConversationChatLoadingState,
} from "store/selectors/conversationSelectors";
import { useConversationQuery } from "hooks/queries";
import { groupMessages, fixLineBreaks } from "lib";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";

import { getUserFromConversation } from "./functions";

import FeedHeader from "./components/FeedHeader";
import FeedMessagesList from "./components/FeedMessagesList";
import { TextArea, Spinner, Error } from "components/Layouts";
import styles from "./components/styles/feed.module.scss";

function Feed() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    conversation,
    conversationState: { loading, error, message },
  } = useSelector(selectActiveConversation);
  const {
    error: chatError,
    task: chatTask,
    message: chatErrorMessage,
  } = useSelector(selectConversationChatLoadingState);
  const activeUserId = useSelector(selectActiveUserId);

  const groupedMessages = useMemo(
    () => (conversation ? groupMessages(conversation.messages) : []),
    [conversation?.messages]
  );

  const adressat = useMemo(() => {
    if (!conversation) return;
    return getUserFromConversation({ conversation, activeUserId }).user;
  }, [conversation?.users, activeUserId]);

  const { sendMessageQuery } = useConversationQuery();

  function handleMessage(text) {
    const val = fixLineBreaks(text);
    sendMessageQuery({
      adressatId: adressat._id,
      conversationId: conversation._id,
      body: { message: val },
    });
  }

  function onFocusHandler(e) {
    e.preventDefault();
    if (pathname === "/messanger") navigate(`/messanger/${conversation._id}`);
  }

  return (
    <div
      className={`${styles.messangerFeedContainer} ${
        id ? styles.isActiveConversation : ""
      }`}
    >
      {loading && <Spinner />}

      {!loading && !error && conversation && (
        <>
          <FeedHeader adressat={adressat} />
          <FeedMessagesList
            groupedMessages={groupedMessages}
            adressat={adressat}
            activeUserId={activeUserId}
            lastMessage={conversation.lastMessage}
          />
        </>
      )}

      {error && <Error msg={message} />}

      {chatError && chatTask === "send" && <Error msg={chatErrorMessage} />}

      {!adressat?.isDeleted && (
        <TextArea
          withBtn={false}
          placeholder="write message..."
          className={styles.chatTextBox}
          handler={handleMessage}
          onFocus={onFocusHandler}
        />
      )}
    </div>
  );
}

export default Feed;
