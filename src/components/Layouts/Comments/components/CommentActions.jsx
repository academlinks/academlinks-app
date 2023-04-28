import { useSelector } from "react-redux";

import { useIsAuthenticatedUser } from "hooks/auth";
import { selectActiveUserId } from "store/selectors/activeUserSelectors";

import { TimeAgo } from "components/Layouts";
import { LikeIcon, ReplyIcon } from "components/Layouts/Icons";
import styles from "./styles/commentActions.module.scss";

function CommentActions({ createdAt, reactions, handleReaction, handleReply }) {
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  const activeUserId = useSelector(selectActiveUserId);

  const isUserInteracted = reactions.find(
    (reaction) => reaction.author === activeUserId
  )?.reaction;

  return (
    <div className={styles.commentActions}>
      {isAuthenticatedUser && (
        <>
          <button
            onClick={handleReaction}
            className={isUserInteracted ? styles.userLiked : ""}
          >
            <LikeIcon />
          </button>
          <button onClick={handleReply}>
            <ReplyIcon />
          </button>
        </>
      )}
      <TimeAgo date={createdAt} className={styles.commentTimeAgo} />
    </div>
  );
}

export default CommentActions;
