import { useDispatch } from "react-redux";

import {
  getBlogPosts,
  getTopRatedPublishers,
  getTopRatedBlogPosts,
  getBlogPost,
  getRelatedPosts,
  // NaN API Handlers
  resetPosts,
  resetErrorOnPostOperation,
  resetErrorOnLoadingState,
  setSliderBlogPosts,
} from "store/reducers/postsDataReducer";

import {
  BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT,
  BLOG_POSTS_TOP_RATED_POSTS_COUNT,
  BLOG_POSTS_COUNT_PER_REQ,
} from "lib/config";

export default function useBlogQuery() {
  const dispatch = useDispatch();

  function getBlogPostsQuery({
    manualLoading = false,
    page = 1,
    hasMore,
    pathState,
  }) {
    const query = controllQuery(pathState);
    dispatch(
      getBlogPosts({ page, limit: BLOG_POSTS_COUNT_PER_REQ, hasMore, query })
    );
  }

  function getTopRatedPublishersAndPostsQuery() {
    dispatch(getTopRatedPublishers(BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT));
    dispatch(getTopRatedBlogPosts(BLOG_POSTS_TOP_RATED_POSTS_COUNT));
  }

  function getRelatedPostsQuery({ postId }) {
    dispatch(getRelatedPosts({ postId, limit: 2 }));
  }

  function getPostQuery({ postId }) {
    dispatch(getBlogPost(postId));
  }

  // NaN API Handlers
  function handleResetPosts() {
    dispatch(resetPosts());
  }

  function handleResetPostOperationalError() {
    dispatch(resetErrorOnPostOperation());
  }

  function handleResetPostLoadingError() {
    dispatch(resetErrorOnLoadingState());
  }

  function handelSetSliderBlogPosts() {
    dispatch(setSliderBlogPosts());
  }

  return {
    getBlogPostsQuery,
    getTopRatedPublishersAndPostsQuery,
    getRelatedPostsQuery,
    getPostQuery,
    // NaN API Handlers
    handleResetPosts,
    handleResetPostOperationalError,
    handleResetPostLoadingError,
    handelSetSliderBlogPosts,
  };
}

function controllQuery(pathStates) {
  const author = pathStates?.author;
  const category = pathStates?.category;

  return `${author ? `&author=${author}` : ""}${
    category?.[0] ? `&category=${category.join(",")}` : ""
  }`;
}
