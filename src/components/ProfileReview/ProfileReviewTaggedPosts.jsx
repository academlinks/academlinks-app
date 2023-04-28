import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "hooks/queries";
import { selectPosts } from "store/selectors/postSelectors";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";

function ProfileReviewTaggedPosts() {
  const { posts } = useSelector(selectPosts);
  const { showOnProfileQuery, removeTagQuery } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            removeTagHandler={removeTagQuery}
            showOnProfileHandler={showOnProfileQuery}
            onHiddens={false}
            key={post._id}
          />
        ))}
    </div>
  );
}

export default ProfileReviewTaggedPosts;
