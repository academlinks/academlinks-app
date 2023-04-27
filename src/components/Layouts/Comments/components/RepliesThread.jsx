import { useSelector } from "react-redux";

import { selectCommentsLoadingState } from "../../../../store/selectors/commentsSelector";
import {
  useCommentPin,
  useCommentsQuery,
  useIsAuthenticatedUser,
} from "../../../../hooks";

import styles from "./styles/repliesThread.module.scss";
import { Error } from "../..";
import { Comment, ShowRepliesBTN, DraftForComments } from ".";

function RepliesThread({ state, data, handlers }) {
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  const {
    setCommentText,
    handleShowReplies,
    setCommentReply,
    resetCommentCredentials,
    setUpdateComment,
  } = handlers;

  const {
    postId,
    parentId,
    authorId,
    postAuthorId,
    authorName,
    replies,
    repliesAmount,
  } = data;

  const { activeReply, updateReply, showReplies, parentAuthor, text } = state;

  const reseter = () => resetCommentCredentials();

  const { submitCommentQuery } = useCommentsQuery(
    "REPLIES_THREAD",
    {
      postId: postId,
      commentId: parentId,
      adressatId: [{ authorId: authorId, adressatName: authorName }],
      replyId: state.replyId,
      parentAuthor,
      text,
    },
    { updateReply, activeReply, resetHandler: reseter }
  );

  const commentReplies = useCommentPin(replies);

  const { error, message, target, task } = useSelector(
    selectCommentsLoadingState
  );

  return (
    <>
      <ShowRepliesBTN
        conditions={{ showReplies, activeReply, updateReply }}
        data={{
          adressatId: authorId,
          adressatName: authorName,
          replies,
          repliesAmount,
        }}
        handleShowReplies={handleShowReplies}
      />

      {(showReplies || activeReply || updateReply) && (
        <div className={styles.nestedList}>
          {commentReplies?.map((reply) => (
            <Comment
              type="Reply"
              data={{ postId, comment: reply, parentId, postAuthorId }}
              handlers={{ setCommentReply, setUpdateComment }}
              className={styles.nestedComment}
              key={reply._id}
            />
          ))}

          {error &&
            target === "reply" &&
            (task === "add" || task === "update") && <Error msg={message} />}

          {isAuthenticatedUser && (
            <DraftForComments
              submitCommentQuery={submitCommentQuery}
              setCommentText={setCommentText}
              text={text}
            />
          )}
        </div>
      )}
    </>
  );
}

export default RepliesThread;
