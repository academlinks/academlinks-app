/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  selectPosts,
  selectPostsLoadingState,
} from "../../store/selectors/postSelectors";
import { useBlogQuery, useDocTitle } from "../../hooks";

import { Blog } from "../../components/BlogPage";
import { StandSpinner, Error } from "../../components/Layouts";

function BlogPage() {
  useDocTitle("Blog");

  const { state } = useLocation();

  const { posts, hasMore } = useSelector(selectPosts);
  const { loading, error, task, message } = useSelector(
    selectPostsLoadingState
  );

  const {
    getBlogPostsQuery,
    getTopRatedPublishersAndPostsQuery,
    handleResetPosts,
    handleResetPostLoadingError,
    handelSetSliderBlogPosts,
  } = useBlogQuery();

  const [page, setPage] = useState(1);
  async function handleNext() {
    getBlogPostsQuery({
      page: page + 1,
      hasMore: true,
      pathState: state,
    });

    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    getBlogPostsQuery({
      hasMore: false,
      pathState: state,
    });

    getTopRatedPublishersAndPostsQuery();

    return () => handleResetPosts();
  }, []);

  const [afterMount, setAfterMount] = useState(false);
  useEffect(() => {
    if (afterMount) {
      getBlogPostsQuery({
        hasMore: false,
        pathState: state,
      });
    }

    setAfterMount(true);
  }, [state]);

  useEffect(() => {
    !loading && handelSetSliderBlogPosts();
  }, [loading]);

  return (
    <>
      {loading && <StandSpinner />}
      {!loading && (!error || (error && task !== "get")) && (
        <Blog posts={posts} hasMore={hasMore} handleNext={handleNext} />
      )}
      {error && (
        <Error
          asModal={true}
          msg={message}
          onClose={handleResetPostLoadingError}
        />
      )}
    </>
  );
}

export default BlogPage;
