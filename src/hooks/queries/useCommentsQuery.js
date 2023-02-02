import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  addComment,
  deleteComment,
  updateComment,
  reactOnComment,
  pinComment,
  addCommentReply,
  deleteCommentReply,
  updateCommentReply,
  reactOnCommentReply,
  pinCommentReply,
  getPostComments,
  // NaN API Handlers
  resetComments,
} from "../../store/reducers/commentsDataReducer";

import { fixLineBreaks } from "../../lib";

function useCommentsQuery(thread, options, conditions) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const getPostCommentsQuery = () => dispatch(getPostComments(options.postId));

  function submitCommentQuery() {
    const tags = options.tags.map((tag) => tag._id).filter((tag) => tag !== id);

    if (!options.text.trim() && !tags[0]) return;

    if (conditions.updateParent || conditions.updateReply) {
      if (thread === "MAIN_THREAD") {
        dispatch(
          updateComment({
            body: { tags, text: fixLineBreaks(options.text) },
            params: {
              postId: options.postId,
              commentId: options.commentId,
            },
          })
        );
      } else if (thread === "REPLIES_THREAD") {
        dispatch(
          updateCommentReply({
            body: { tags, text: fixLineBreaks(options.text) },
            params: {
              postId: options.postId,
              commentId: options.commentId,
              replyId: options.replyId,
            },
          })
        );
      }
    } else {
      if (thread === "MAIN_THREAD") {
        dispatch(
          addComment({
            postId: options.postId,
            body: { tags, text: fixLineBreaks(options.text) },
          })
        );
      } else if (thread === "REPLIES_THREAD") {
        dispatch(
          addCommentReply({
            params: { commentId: options.commentId, postId: options.postId },
            body: { tags, text: fixLineBreaks(options.text) },
          })
        );
      }
    }

    conditions.resetHandler();
  }

  function deleteCommentQuery({ type, postId, commentId, replyId }) {
    if (type === "Parent") dispatch(deleteComment({ postId, commentId }));
    else if (type === "Reply")
      dispatch(deleteCommentReply({ postId, commentId, replyId }));
  }

  function reactOnCommentQuery({ type, postId, commentId, replyId }) {
    if (type === "Parent") dispatch(reactOnComment({ commentId, postId }));
    else if (type === "Reply")
      dispatch(reactOnCommentReply({ postId, commentId, replyId }));
  }

  function pinCommentQuery({ type, postId, commentId, replyId }) {
    if (type === "Parent") dispatch(pinComment({ postId, commentId }));
    else if (type === "Reply")
      dispatch(pinCommentReply({ postId, commentId, replyId }));
  }

  // NaN API Handlers
  function handleResetComments() {
    dispatch(resetComments());
  }

  return {
    getPostCommentsQuery,
    submitCommentQuery,
    deleteCommentQuery,
    reactOnCommentQuery,
    pinCommentQuery,
    // NaN API Handlers
    handleResetComments,
  };
}

export default useCommentsQuery;
