import { usePost } from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import "./styles/feedInfiniteScroll.scss";
import styles from "./styles/feedContent.module.scss";
import { Post, CreatePost, ScrollEnd, BlockSpinner } from "../Layouts";

function FeedContent({ hasMore, handleNext, posts }) {
  const {
    activatePostMediaHandler,
    activateSharePostModal,
    activateUpdatePostModal,
  } = usePost();

  return (
    <div className={`${styles.feedContent} feed-page__container`}>
      <CreatePost />
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        className={styles.feedInfiniteScroll}
      >
        {posts.map((post) => (
          <Post
            options={{ report: true, save: true }}
            data={post}
            activatePostMediaHandler={activatePostMediaHandler}
            activateSharePostModal={activateSharePostModal}
            activateUpdatePostModal={activateUpdatePostModal}
            className={styles.feedPost}
            key={post._id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedContent;
