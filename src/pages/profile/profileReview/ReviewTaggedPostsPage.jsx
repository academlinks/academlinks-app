/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectPosts,
  selectPostsLoadingState,
} from "store/selectors/postSelectors";
import { useDocTitle } from "hooks/layoutBased";
import { useProfileReviewQuery } from "hooks/queries";

import { Spinner, Error, EmptyContentMessage } from "components/Layouts";
import ProfileReviewTaggedPosts from "components/ProfileReview/ProfileReviewTaggedPosts";

function ReviewTaggedPostsPage() {
  useDocTitle("Profile | Tagged Posts");

  const { posts } = useSelector(selectPosts);

  const { loading, error, message } = useSelector(selectPostsLoadingState);

  const { getPendingPostsQuery, resetState } = useProfileReviewQuery();

  useEffect(() => {
    getPendingPostsQuery();
    return () => resetState();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && <ProfileReviewTaggedPosts />}
      {error && <Error msg={message} />}
      {!loading && !error && !posts[0] && (
        <EmptyContentMessage message="there are no pending posts" />
      )}
    </>
  );
}

export default ReviewTaggedPostsPage;
