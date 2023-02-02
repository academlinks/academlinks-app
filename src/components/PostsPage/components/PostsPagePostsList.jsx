import { useSelector } from "react-redux";

import { selectPostsLoadingState } from "../../../store/selectors/postSelectors";
import { usePost } from "../../../hooks";

import InfiniteScroll from "react-infinite-scroll-component";

import "./styles/postsPageInfiniteScroll.scss";
import styles from "./styles/postsPageContent.module.scss";
import { Post, ScrollEnd, BlockSpinner, Spinner, Error } from "../../Layouts";

function PostsPagePostsList({ children, data, infinite }) {
  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();
  const { handleNext, hasMore } = infinite;

  const { loading, error, message } = useSelector(selectPostsLoadingState);

  return (
    <div className={`${styles.postsPageContent} posts-page__container`}>
      {children}

      {loading && <Spinner />}

      {error && <Error msg={message} />}

      {!loading && !error && (
        <InfiniteScroll
          dataLength={data?.length}
          next={handleNext}
          hasMore={hasMore}
          loader={<BlockSpinner />}
          endMessage={<ScrollEnd />}
          className={styles.postsPageContentScroll}
        >
          {data?.map((post) => (
            <Post
              key={post._id}
              data={post}
              activatePostMediaHandler={activatePostMediaHandler}
              activateUpdatePostModal={activateUpdatePostModal}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PostsPagePostsList;
