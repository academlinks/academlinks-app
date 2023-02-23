// import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCommentsLoadingState } from "../../../../store/selectors/commentsSelector";
import { useCommentPin, useCommentsQuery } from "../../../../hooks";

import styles from "./styles/repliesThread.module.scss";
import { Error } from "../..";
import { Comment, ShowRepliesBTN, DraftForComments } from ".";

function RepliesThread({ state, data, handlers }) {
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

  const {
    activeReply,
    updateReply,
    showReplies,
    tags,
    text: updateText,
    parentAuthor,
    text,
  } = state;

  const reseter = () => resetCommentCredentials();

  const { submitCommentQuery } = useCommentsQuery(
    "REPLIES_THREAD",
    {
      postId: postId,
      commentId: parentId,
      adressatId: tags || [{ authorId: authorId, adressatName: authorName }],
      replyId: state.replyId,
      parentAuthor,
      text,
      tags,
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

          <DraftForComments
            submitCommentQuery={submitCommentQuery}
            setCommentText={setCommentText}
            text={updateReply ? updateText : ""}
          />
        </div>
      )}
    </>
  );
}

export default RepliesThread;
