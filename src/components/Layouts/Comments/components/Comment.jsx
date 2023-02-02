import { useSelector } from "react-redux";

import { useCommentsQuery } from "../../../../hooks";
import { selectActiveUserId } from "../../../../store/selectors/activeUserSelectors";
import { selectCommentsLoadingState } from "../../../../store/selectors/commentsSelector";
import { inverseLineBreaks } from "../../../../lib";

import styles from "./styles/comment.module.scss";
import { UserIdentifier, Tags, Error } from "../../";
import { PinIcon } from "../../Icons/icons";
import { CommentContent, CommentActions } from "./";

/**
 * This component represents the comment body, like user identifier, comment text, timeAgo text and action buttons-: like and reply. After all this component is used by "CommentListItem" as well as "RepliesThread" so this is the crossroad to access actions like options, reactions and reply for parent comment as well as for comment from replies thread.
 * @param {string} type "Parent"||"Reply" must to be passed based on component which renders "Comment", tries to represent the comment from main thread or comment from replies thread. Based on type into the coresponding commentReducer function will be passed coressponding information. After all this prop helps useCommentQuery to define which kind of function to execute, forexample send like for Parent or for Reply
 * @param {Object} data object which contains individual comment object, postId and if it comes from replies thread even the parentId(parent comment id)
 * @param {function} handlers object which contains functions: setCommentReply and setUpdateComment
 * @returns
 */
function Comment({ type, data, handlers, className }) {
  const { comment, postId, postAuthorId, parentId } = data;

  const { reactOnCommentQuery, pinCommentQuery, deleteCommentQuery } =
    useCommentsQuery();

  const commentId = type === "Parent" ? comment._id : parentId;
  const replyId = type === "Reply" ? comment._id : "";

  const activeUserId = useSelector(selectActiveUserId);
  function handleReplyCredentials() {
    handlers.setCommentReply({
      commentId,
      tag:
        comment.author._id !== activeUserId
          ? { _id: comment.author._id, userName: comment.author.userName }
          : null,
    });
  }

  function handleUpdateCredentials() {
    handlers.setUpdateComment({
      commentId,
      replyId,
      text: inverseLineBreaks(comment.text),
      type: `update${type}`,
      tags: comment.tags,
    });
  }

  const { error, message, target, task } = useSelector(
    selectCommentsLoadingState
  );

  return (
    <>
      <div className={`${styles.comment} ${className || ""}`} id={comment._id}>
        <div className={styles.commentHeader}>
          <UserIdentifier
            userId={
              comment.cachedUser && comment.cachedUser.isDeleted
                ? "DELETED_LINK"
                : comment.author?._id
            }
            userName={
              comment.cachedUser && comment.cachedUser.isDeleted
                ? comment.cachedUser.userName
                : comment.author?.userName
            }
            img={comment.author?.profileImg}
            withTime={false}
            className={styles.commentUserIdentifier}
          >
            {comment.tags[0] && <Tags tags={comment.tags} keyWord="to" />}
          </UserIdentifier>
          {comment.pin && <PinIcon className={styles.pinIcon} />}
        </div>
        
        <CommentContent
          text={comment.text}
          likesCount={comment.likesAmount}
          postAuthorId={postAuthorId}
          commentAuthorId={
            comment.cachedUser && comment.cachedUser.isDeleted
              ? comment.cachedUser.cachedUserId
              : comment.author._id
          }
          handlePinComment={() =>
            pinCommentQuery({ type, postId, commentId, replyId })
          }
          handleUpdateCredentials={handleUpdateCredentials}
          handleDeleteComment={() =>
            deleteCommentQuery({ type, postId, commentId, replyId })
          }
        />

        {!comment.cachedUser?.isDeleted && (
          <CommentActions
            reactions={comment.reactions}
            createdAt={comment.createdAt}
            handleReaction={() =>
              reactOnCommentQuery({ type, postId, commentId, replyId })
            }
            handleReply={handleReplyCredentials}
          />
        )}
      </div>
      {error &&
        (task === "deletion" || task === "pin") &&
        target === type.toLowerCase() && <Error msg={message} />}
    </>
  );
}

export default Comment;
