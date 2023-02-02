import { useDispatch, useSelector } from "react-redux";

import {
  resetPosts,
  getFeedPosts,
  resetErrorOnLoadingState,
} from "../../store/reducers/postsDataReducer";
import { FEED_POSTS_COUNT_PER_REQ } from "../../lib/config";
import { resetComments } from "../../store/reducers/commentsDataReducer";
import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

export default function useFeedQuery() {
  const dispatch = useDispatch();
  const activeUserId = useSelector(selectActiveUserId);

  function getFeedPostsQuery({ page = 1, hasMore = false }) {
    dispatch(
      getFeedPosts({
        limit: FEED_POSTS_COUNT_PER_REQ,
        id: activeUserId,
        hasMore,
        page,
      })
    );
  }

  function resetState() {
    dispatch(resetPosts());
    dispatch(resetComments());
  }

  function handleResetPostsLoadingError() {
    dispatch(resetErrorOnLoadingState());
  }

  return {
    getFeedPostsQuery,
    resetState,
    handleResetPostsLoadingError,
  };
}
