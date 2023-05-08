/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Media, Article, RelatedPosts } from "./";
import { PostActions, CommentsList } from "components/Layouts";
import styles from "./styles/content.module.scss";

function Content({ post }) {
  const [showComments, setShowComments] = useState(false);
  const { state: pathState } = useLocation();

  useEffect(() => {
    pathState?.commentId && setShowComments(true);
  }, []);

  return (
    <>
      {post.media[0] && <Media media={post.media} />}
      <Article post={post} />
      <RelatedPosts />
      <div className={styles.postActionsBox} id="commentBlock">
        <PostActions setShowCommnents={setShowComments} data={post} />
        {showComments && (
          <CommentsList
            postId={post._id}
            postAuthorId={post?.author._id}
            notifyOnComment={pathState?.commentId ? pathState : null}
          />
        )}
      </div>
    </>
  );
}

export default Content;
