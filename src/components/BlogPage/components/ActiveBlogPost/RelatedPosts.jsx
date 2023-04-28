import { useSelector } from "react-redux";

import {
  selectRelatedPosts,
  selectRelatedPostsLoadingState,
} from "store/selectors/postSelectors";

import styles from "./styles/relatedPosts.module.scss";
import { BlogPost, Error } from "components/Layouts";

function RelatedPosts() {
  const relatedPosts = useSelector(selectRelatedPosts);
  const { loading, error, message } = useSelector(
    selectRelatedPostsLoadingState
  );

  return (
    <div className={styles.blogPostsRelated}>
      {!loading &&
        !error &&
        relatedPosts?.map((post) => (
          <BlogPost
            limitation={50}
            post={post}
            key={post._id}
            className={styles.relatedBlogPost}
          />
        ))}
      {error && <Error msg={message} className={styles.relatedPostsError} />}
    </div>
  );
}

export default RelatedPosts;
