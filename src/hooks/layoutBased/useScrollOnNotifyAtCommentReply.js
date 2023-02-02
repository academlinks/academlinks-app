/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function useScrollOnNotifyAtCommentReply({ handleShowReplies, notifyOnComment, comment }) {
  const [scrollToComment, setScrollToComment] = useState(false);

  useEffect(() => {
    if (!notifyOnComment || notifyOnComment.commentId !== comment._id) return;
    handleShowReplies();
    setScrollToComment(true);
  }, []);

  useEffect(() => {
    if (!scrollToComment) return;

    document
      .getElementById(notifyOnComment.replyId)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });

    setScrollToComment(false);
  }, [scrollToComment]);
}

export default useScrollOnNotifyAtCommentReply;
