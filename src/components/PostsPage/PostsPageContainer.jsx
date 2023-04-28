import { useScroll } from "hooks/util";
import styles from "./components/styles/postsPageContainer.module.scss";

function PostsPageContainer({ children }) {
  useScroll({ target: "window" });
  return <div className={styles.postsPageContainer}>{children}</div>;
}

export default PostsPageContainer;
