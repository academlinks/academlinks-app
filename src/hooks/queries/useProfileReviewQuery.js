import { useDispatch, useSelector } from "react-redux";
import {
  showOnProfile,
  removeTag,
  addToProfile,
  hideFromProfile,
  resetPosts,
  getHiddenPosts,
  getPendingPosts,
} from "../../store/reducers/postsDataReducer";

import { resetComments } from "../../store/reducers/commentsDataReducer";

import { selectActiveUserId } from "../../store/selectors/activeUserSelectors";

function useProfileReviewQuery() {
  const dispatch = useDispatch();

  const activeUserId = useSelector(selectActiveUserId);

  function getHiddenPostsQuery() {
    dispatch(getHiddenPosts(activeUserId));
  }

  function getPendingPostsQuery() {
    dispatch(getPendingPosts(activeUserId));
  }

  function showOnProfileQuery(postId, value) {
    dispatch(showOnProfile({ postId, body: { show: value } }));
  }

  function removeTagQuery(postId) {
    dispatch(removeTag(postId));
  }

  function addToProfileQuery(postId) {
    dispatch(addToProfile(postId));
  }

  function hideFromProfileQuery(postId) {
    dispatch(hideFromProfile(postId));
  }

  // NaN API handlers
  function resetState() {
    dispatch(resetPosts());
    dispatch(resetComments());
  }

  return {
    getHiddenPostsQuery,
    getPendingPostsQuery,
    showOnProfileQuery,
    removeTagQuery,
    addToProfileQuery,
    hideFromProfileQuery,
    // NaN API handlers
    resetState,
  };
}

export default useProfileReviewQuery;
