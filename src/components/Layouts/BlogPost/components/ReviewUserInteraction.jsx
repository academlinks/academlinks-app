import { useIsAuthenticatedUser } from "hooks/auth";

import {
  LikeIcon,
  DislikeIcon,
  CommentIcon,
} from "components/Layouts/Icons";
import BlogPostOptions from "./BlogPostOptions";
import styles from "./styles/reviewUserInteraction.module.scss";

function ReviewUserInteraction({
  commentsAmount,
  likesAmount,
  dislikesAmount,
  postId,
}) {
  const { isAuthenticatedUser } = useIsAuthenticatedUser();

  return (
    <div data-user-interacion className={styles.blogPostUserInteractionsBox}>
      <div className={styles.blogPostInteractions}>
        <span>
          <LikeIcon />({likesAmount})
        </span>
        <span>
          <DislikeIcon />({dislikesAmount})
        </span>
        <span>
          <CommentIcon />({commentsAmount})
        </span>
      </div>
      {isAuthenticatedUser && <BlogPostOptions postId={postId} />}
    </div>
  );
}

export default ReviewUserInteraction;
