/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useCommentPin } from "hooks/util";
import { useCommentsQuery } from "hooks/queries";
import { useIsAuthenticatedUser } from "hooks/auth";
import { useComments, useScrollOnNotifyAtComment } from "hooks/layoutBased";
import {
  selectPostCommentsById,
  selectCommentsLoadingState,
} from "store/selectors/commentsSelector";

import { CommentListItem, DraftForComments } from "./components";
import { BlockSpinner, Error, EmptyContentMessage } from "components/Layouts";
import styles from "./components/styles/commentsList.module.scss";

function CommentsList({ postId, postAuthorId, notifyOnComment }) {
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  const { loading, error, message, target, task } = useSelector(
    selectCommentsLoadingState
  );

  const data = useSelector((state) => selectPostCommentsById(state, postId));

  // Sorts comments data by "Pin" property
  const comments = useCommentPin(data || []);

  const {
    state,
    resetCommentCredentials,
    setCommentText,
    setUpdateComment: setUpdateParentComment,
  } = useComments();

  // resets all comment data during update
  const reseter = () => resetCommentCredentials();

  const { getPostCommentsQuery, submitCommentQuery } = useCommentsQuery(
    "MAIN_THREAD",
    { postId, commentId: state.commentId, text: state.text },
    { updateParent: state.updateParent, resetHandler: reseter }
  );

  useEffect(() => {
    getPostCommentsQuery();
  }, []);

  useScrollOnNotifyAtComment({ notifyOnComment });

  return (
    <div className={styles.commentsContainer}>
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
              notifyOnComment={
                notifyOnComment?.replyId ? notifyOnComment : null
              }
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
      </div>

      {isAuthenticatedUser && (
        <DraftForComments
          submitCommentQuery={submitCommentQuery}
          setCommentText={setCommentText}
          text={state.text}
        />
      )}
    </div>
  );
}

export default CommentsList;
