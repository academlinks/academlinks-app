import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  selectAllConversations,
  selectAllConversationLoadingState,
  selectConversationChatLoadingState,
} from "store/selectors/conversationSelectors.js";
import { useConversationQuery } from "hooks/queries";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";

import {
  getUserFromConversation,
  getLastMessageDateCreation,
} from "./functions";

import { Error, BlockSpinner } from "components/Layouts";
import Conversation from "./components/Conversation";
import UserSearchBar from "./components/UserSearchBar.jsx";
import styles from "./components/styles/sideBar.module.scss";

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
              (conversationA, conversationB) =>
                getLastMessageDateCreation({ conversation: conversationB }) -
                getLastMessageDateCreation({ conversation: conversationA })
            )
            .map((conversation) => (
              <Conversation
                key={conversation._id}
                conversationId={conversation._id}
                lastMessage={conversation.lastMessage}
                author={
                  getUserFromConversation({
                    conversation,
                    activeUserId,
                  }).user
                }
                adressatId={
                  getUserFromConversation({
                    conversation,
                    activeUserId,
                  }).userId
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
