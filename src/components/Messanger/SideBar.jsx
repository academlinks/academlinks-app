import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  selectAllConversations,
  selectAllConversationLoadingState,
  selectConversationChatLoadingState,
} from "../../store/selectors/conversationSelectors.js";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";
import { useConversationQuery } from "../../hooks/index.js";
import { getConversationLastMsg } from "../../lib";

import styles from "./components/styles/sideBar.module.scss";
import { Error, BlockSpinner } from "../Layouts";
import Conversation from "./components/Conversation";
import UserSearchBar from "./components/UserSearchBar.jsx";

export function checkDeletedUser(conversation, activeUserId) {
  return (
    conversation.deletedUsers &&
    conversation.deletedUsers.some(
      (u) => u.isDeleted && u.cachedUserId !== activeUserId
    )
  );
}

function SideBar() {
  const { id } = useParams();

  const activeUserId = useSelector(selectActiveUserId);
  const { allConversations: conversations } = useSelector(
    selectAllConversations
  );

  const { error, message, loading } = useSelector(
    selectAllConversationLoadingState
  );
  const {
    error: conversationError,
    task: conversationTask,
    message: conversationErrorMessage,
  } = useSelector(selectConversationChatLoadingState);

  function getLatsMsgDateCreation(conversation) {
    return new Date(getConversationLastMsg(conversation)?.createdAt).getTime();
  }

  const { handleResetChatError } = useConversationQuery();

  return (
    <aside
      className={`${styles.sideBar} ${id ? styles.isActiveConversation : ""}`}
    >
      <div>
        <UserSearchBar />
      </div>

      {loading && <BlockSpinner />}

      {!error && conversations[0] && (
        <div className={styles.contentBox}>
          {[...conversations]
            ?.sort(
              (a, b) => getLatsMsgDateCreation(b) - getLatsMsgDateCreation(a)
            )
            .map((conversation) => (
              <Conversation
                key={conversation._id}
                author={
                  checkDeletedUser(conversation, activeUserId)
                    ? conversation.deletedUsers.find(
                        (u) => u.isDeleted && u.cachedUserId !== activeUserId
                      )
                    : conversation.users.find(
                        (user) => user._id !== activeUserId
                      )
                }
                conversationId={conversation._id}
                lastMessage={conversation.lastMessage}
                adressatId={
                  checkDeletedUser(conversation, activeUserId)
                    ? conversation.deletedUsers.find(
                        (u) => u.isDeleted && u.cachedUserId !== activeUserId
                      ).cachedUserId
                    : conversation.users.find((u) => u._id !== activeUserId)._id
                }
              />
            ))}
        </div>
      )}

      {error && <Error msg={message} />}

      {conversationError &&
        (conversationTask === "mark" || conversationTask === "deletion") && (
          <Error
            msg={conversationErrorMessage}
            asModal={true}
            onClose={handleResetChatError}
          />
        )}
    </aside>
  );
}

export default SideBar;
