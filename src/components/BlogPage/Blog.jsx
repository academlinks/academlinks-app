import { useScroll } from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import "./components/Blog/styles/blogPageInfiniteScroll.scss";
import styles from "./components/Blog/styles/blog.module.scss";

import {
  BlogPost,
  CreateBlogPostTouch,
  ScrollEnd,
  BlockSpinner,
} from "../Layouts";
import { Stand, RightBar, CategoriesNav } from "./components/Blog";

function Blog({ posts, hasMore, handleNext }) {
  useScroll({ target: "window" });

  return (
    <div className={`${styles.blogPage} blog-page--container`}>
      <Stand />

      <CategoriesNav />

      <div className={styles.blogPageCreateBlogPostTouch}>
        <CreateBlogPostTouch />
      </div>

      <RightBar />

      <InfiniteScroll
        dataLength={posts?.length}
        next={handleNext}
        hasMore={hasMore}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        className={styles.blogPostsScrollBox}
      >
        {posts.map((post) => (
          <BlogPost post={post} key={post._id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Blog;
