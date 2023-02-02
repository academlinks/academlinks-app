/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

function useScrollOnNotifyAtComment({ notifyOnComment }) {
  useEffect(() => {
    if (!notifyOnComment) return;

    !notifyOnComment.replyId &&
      document
        .getElementById(notifyOnComment.commentId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);
}

export default useScrollOnNotifyAtComment;
