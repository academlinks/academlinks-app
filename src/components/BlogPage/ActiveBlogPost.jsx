import { useSelector } from "react-redux";

import { selectPostOnZero } from "../../store/selectors/postSelectors";

import styles from "./components/ActiveBlogPost/styles/activeBlogPost.module.scss";
import { LeftBar, RightBar, Content } from "./components/ActiveBlogPost";

function ActiveBlogPost() {
  const post = useSelector(selectPostOnZero);

  return (
    <div className={styles.activeBlogPostBox}>
      <LeftBar />
      {post && <Content post={post} />}
      <RightBar />
    </div>
  );
}

export default ActiveBlogPost;
