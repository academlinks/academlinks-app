import { useSelector } from "react-redux";
import {
  selectTopRatedBlogPosts,
  selectTopRatedBlogPostsLoadingState,
} from "../../../../store/selectors/postSelectors";

import styles from "./styles/topRatedPosts.module.scss";
import { BlogPost, Spinner, Error } from "../../../Layouts";

function TopRatedPosts() {
  const posts = useSelector(selectTopRatedBlogPosts);
  const { loading, error, message } = useSelector(
    selectTopRatedBlogPostsLoadingState
  );

  return (
    <div className={styles.topRatedPosts}>
      {loading && <Spinner />}
      {!loading &&
        !error &&
        posts?.map((post) => (
          <BlogPost
            post={post}
            limitation={350}
            className={styles.topRatedBlogPost}
            key={post._id}
          />
        ))}
      {error && <Error msg={message} />}
    </div>
  );
}

export default TopRatedPosts;
