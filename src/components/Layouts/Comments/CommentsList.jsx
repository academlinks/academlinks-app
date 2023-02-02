/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useCommentPin,
  useComments,
  useCommentsQuery,
  useScrollOnNotifyAtComment,
} from "../../../hooks";
import {
  selectPostCommentsById,
  selectCommentsLoadingState,
} from "../../../store/selectors/commentsSelector";

import styles from "./components/styles/commentsList.module.scss";
import { TextAreaWithTag, BlockSpinner, Error, EmptyContentMessage } from "../";
import { CommentListItem } from "./components";

function CommentsList({ postId, postAuthorId, notifyOnComment }) {
  const { loading, error, message, target, task } = useSelector(
    selectCommentsLoadingState
  );

  const data = useSelector((state) => selectPostCommentsById(state, postId));

  // Sorts comments data by "Pin" property
  const comments = useCommentPin(data || []);

  const {
    state,
    resetCommentCredentials,
    setTag,
    removeTag,
    setCommentText,
    setUpdateComment: setUpdateParentComment,
  } = useComments();

  // resets all comment data during update
  const reseter = () => resetCommentCredentials();

  const { getPostCommentsQuery, submitCommentQuery } = useCommentsQuery(
    "MAIN_THREAD",
    { postId, commentId: state.commentId, text: state.text, tags: state.tags },
    { updateParent: state.updateParent, resetHandler: reseter }
  );

  useEffect(() => {
    getPostCommentsQuery();
  }, []);

  useScrollOnNotifyAtComment({ notifyOnComment });

  return (
    <div className={styles.commentsList}>
      {loading && <BlockSpinner />}
      {!loading &&
        (!error || (error && target !== "global")) &&
        comments?.map((comment) => (
          <CommentListItem
            comment={comment}
            setUpdateParentComment={setUpdateParentComment}
            postId={postId}
            postAuthorId={postAuthorId}
            notifyOnComment={notifyOnComment?.replyId ? notifyOnComment : null}
            key={comment._id}
          />
        ))}
      {!loading && !error && !comments[0] && (
        <EmptyContentMessage message="there are no comments yet" />
      )}
      {error && target === "global" && task === "get" && (
        <Error msg={message} />
      )}
      {error &&
        target === "parent" &&
        (task === "add" || task === "update") && <Error msg={message} />}
      <TextAreaWithTag
        text={state.text}
        setText={setCommentText}
        tags={state.tags}
        setTag={setTag}
        removeTag={removeTag}
        submitHandler={submitCommentQuery}
        defaultValue={state.updateParent ? state.text : ""}
        placeholder="write your comment..."
        className={styles.commentTextArea}
      />
    </div>
  );
}

export default CommentsList;
