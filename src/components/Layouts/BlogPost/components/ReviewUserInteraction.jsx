import styles from './styles/reviewUserInteraction.module.scss';
import { LikeIcon, DislikeIcon, CommentIcon } from '../../../Layouts/Icons/icons';
import BlogPostOptions from './BlogPostOptions';

function ReviewUserInteraction({ commentsAmount, likesAmount, dislikesAmount, postId }) {
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
      <BlogPostOptions postId={postId} />
    </div>
  );
}

export default ReviewUserInteraction;
