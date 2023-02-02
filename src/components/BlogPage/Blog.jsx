import { useEffect, useState } from "react";
import { useWindowDimention, useScroll } from "../../hooks";

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

  const [limit, setLimit] = useState(1500);
  const { width } = useWindowDimention();
  useEffect(() => {
    if (width <= 480) setLimit(200);
    else if (width <= 680) setLimit(450);
    else if (width <= 960) setLimit(900);
    else setLimit(1500);
  }, [width]);

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
          <BlogPost post={post} key={post._id} limitation={limit} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Blog;
