import { usePost, useScroll } from "../../hooks";

import InfiniteScroll from "react-infinite-scroll-component";

import "./styles/bookmarksInfiniteScroll.scss";
import { Post, DeletedPost, ScrollEnd, BlockSpinner } from "../Layouts";

function Bookmarks({ hasMore, handleNext, posts }) {
  useScroll({
    target: "elem",
    scrollTo: "bookmarks__page",
    options: { block: "start" },
  });

  const { activatePostMediaHandler, activateUpdatePostModal } = usePost();

  return (
    posts[0] && (
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        dataLength={posts.length}
        loader={<BlockSpinner />}
        endMessage={<ScrollEnd />}
        style={{ display: "flex", flexDirection: "column", gap: "4rem" }}
      >
        {posts?.map((bookmark) =>
          (bookmark.deleted || bookmark.restricted) &&
          (bookmark.type === "blogPost" || !bookmark.type) ? (
            <DeletedPost postId={bookmark._id} key={bookmark._id} />
          ) : (
            <Post
              data={bookmark}
              key={bookmark._id}
              activatePostMediaHandler={activatePostMediaHandler}
              activateUpdatePostModal={activateUpdatePostModal}
            />
          )
        )}
      </InfiniteScroll>
    )
  );
}

export default Bookmarks;
