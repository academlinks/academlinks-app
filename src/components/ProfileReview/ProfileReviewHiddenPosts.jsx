import { useSelector } from "react-redux";

import { useProfileReviewQuery } from "../../hooks";
import { selectPosts } from "../../store/selectors/postSelectors";

import styles from "./components/styles/review.module.scss";
import ReviewPostBody from "./components/ReviewPostBody";

function ProfileReviewHiddenPosts() {
  const { posts } = useSelector(selectPosts);

  const { addToProfileQuery } = useProfileReviewQuery();

  return (
    <div className={styles.reviewContainer}>
      {posts[0] &&
        posts.map((post) => (
          <ReviewPostBody
            post={post}
            showOnProfileHandler={addToProfileQuery}
            onHiddens={true}
            key={post._id}
          />
        ))}
    </div>
  );
}

export default ProfileReviewHiddenPosts;
