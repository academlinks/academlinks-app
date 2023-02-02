import { useSelector } from "react-redux";
import { selectActiveUserId } from "../../../../store/selectors/activeUserSelectors";

import styles from "./styles/commentActions.module.scss";
import { LikeIcon, ReplyIcon } from "../../Icons/icons";
import { TimeAgo } from "../..";

function CommentActions({ createdAt, reactions, handleReaction, handleReply }) {
  const activeUserId = useSelector(selectActiveUserId);
  
  const isUserInteracted = reactions.find(
    (reaction) => reaction.author === activeUserId
  )?.reaction;

  return (
    <div className={styles.commentActions}>
      <button
        onClick={handleReaction}
        className={isUserInteracted ? styles.userLiked : ""}
      >
        <LikeIcon />
      </button>
      <button onClick={handleReply}>
        <ReplyIcon />
      </button>
      <TimeAgo date={createdAt} className={styles.commentTimeAgo} />
    </div>
  );
}

export default CommentActions;
