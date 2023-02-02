import {
  useComments,
  useScrollOnNotifyAtCommentReply,
} from "../../../../hooks";
import { destructureCommentRepliesProps } from "../../../../lib/destructurers";

import { Comment, RepliesThread } from "./";

/**
 * This component is individual for each comment which belongs to comments main thread. It renders his own replies thread if comment from main thread has replies.
 * @param {object} param.comment object of individual comment
 * @param {object} param.setUpdateParentComment is passed to the parent comment and in passing by this component it sets parent comment credentials to the comments reducer
 * @param {string} param.postId id of post which one comment belongs
 */
function CommentListItem({
  comment,
  setUpdateParentComment,
  postId,
  postAuthorId,
  notifyOnComment,
}) {
  const {
    state,
    setCommentText,
    setTag,
    removeTag,
    setCommentReply,
    setUpdateComment,
    handleShowReplies,
    resetCommentCredentials,
  } = useComments();

  useScrollOnNotifyAtCommentReply({
    handleShowReplies,
    notifyOnComment,
    comment,
  });

  return (
    <>
      <Comment
        type="Parent"
        handlers={{ setCommentReply, setUpdateComment: setUpdateParentComment }}
        data={{ comment, postId, postAuthorId }}
      />
      {comment?.replies && (
        <RepliesThread
          state={state}
          data={{
            postId,
            postAuthorId,
            ...destructureCommentRepliesProps(comment),
          }}
          handlers={{
            setCommentText,
            handleShowReplies,
            setTag,
            removeTag,
            resetCommentCredentials,
            setUpdateComment,
          }}
        />
      )}
    </>
  );
}

export default CommentListItem;
