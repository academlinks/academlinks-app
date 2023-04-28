import { useForeignUser } from "hooks/auth";

import CommentOptions from "./CommentOptions";
import { LikeIcon } from "components/Layouts/Icons";
import { DraftReader } from "components/Layouts";
import styles from "./styles/commentContent.module.scss";

/**
 * renders comment text and options
 */
function CommentContent({
  postAuthorId,
  commentAuthorId,
  text,
  likesCount,
  handlePinComment,
  handleUpdateCredentials,
  handleDeleteComment,
}) {
  const { isActiveUser: postBelongsToActiveUser } = useForeignUser(
    "basedOnId",
    postAuthorId
  );
  const { isActiveUser: commentBelongsToActiveUser } = useForeignUser(
    "basedOnId",
    commentAuthorId
  );

  return (
    <div className={styles.commentContent}>
      <div className={styles.commentText}>
        <DraftReader text={text} limit={100} />
      </div>
      {likesCount > 0 && (
        <p className={styles.commentReactions}>
          <LikeIcon />
          <span>{likesCount}</span>
        </p>
      )}
      <CommentOptions
        postBelongsToActiveUser={postBelongsToActiveUser}
        commentBelongsToActiveUser={commentBelongsToActiveUser}
        pinHandler={handlePinComment}
        updateHandler={handleUpdateCredentials}
        deleteHandler={handleDeleteComment}
      />
    </div>
  );
}

export default CommentContent;
