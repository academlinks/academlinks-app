/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  useBlogQuery,
  useCommentsQuery,
  useCommercialQuery,
  useDocTitle,
} from "../../hooks";
import { selectPostsLoadingState } from "../../store/selectors/postSelectors";

import { ActiveBlogPost } from "../../components/BlogPage";
import { StandSpinner, Error } from "../../components/Layouts";

function ActiveBlogPostPage() {
  useDocTitle("Blog | Article");

  const { id } = useParams();

  const { loading, error, message, task } = useSelector(
    selectPostsLoadingState
  );

  const {
    getRelatedPostsQuery,
    getPostQuery,
    handleResetPosts,
    handleResetPostLoadingError,
  } = useBlogQuery();

  const { handleResetComments } = useCommentsQuery();

  const { getCommercialQuery } = useCommercialQuery();

  useEffect(() => {
    getPostQuery({ postId: id });
    getRelatedPostsQuery({ postId: id });
    getCommercialQuery("blogPost");

    return () => {
      handleResetPosts();
      handleResetComments();
    };
  }, []);

  return (
    <>
      {loading && <StandSpinner />}
      {!loading && (!error || (error && task !== "get")) && <ActiveBlogPost />}
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

export default ActiveBlogPostPage;
