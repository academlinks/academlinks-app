import InfiniteScroll from "react-infinite-scroll-component";

import { usePost } from "hooks/layoutBased";

import { Post, CreatePost, ScrollEnd, BlockSpinner } from "components/Layouts";
import "./styles/feedInfiniteScroll.scss";
import styles from "./styles/feedContent.module.scss";

function FeedContent({ hasMore, handleNext, posts }) {
  const {
    activatePostMediaHandler,
    activateSharePostModal,
    activateUpdatePostModal,
  } = usePost();

  return (
    <div className={`${styles.feedContent} feed-page__container`}>
      <div className={styles.feedCreatePost}>
        <CreatePost />
      </div>
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
