import { useDispatch } from "react-redux";

import {
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
  getPendingRequests,
  getSentRequests,
  getAllFriends,
  // NaN API Tasks
  resetRequestError,
} from "../../store/reducers/friendsReducer";

function useFriendsQuery() {
  const dispatch = useDispatch();

  function sendFriendRequestQuery(userId) {
    dispatch(sendFriendRequest(userId));
  }

  function cancelFriendRequestQuery(userId) {
    dispatch(cancelFriendRequest(userId));
  }

  function deleteFriendRequestQuery(userId) {
    dispatch(deleteFriendRequest(userId));
  }

  function confirmFriendRequestQuery(userId) {
    dispatch(confirmFriendRequest(userId));
  }

  function deleteFriendQuery(userId) {
    dispatch(deleteFriend(userId));
  }

  function getPendingRequestsQuery(userId) {
    dispatch(getPendingRequests(userId));
  }

  function getSentRequestsQuery(id) {
    dispatch(getSentRequests(id));
  }

  function getAllFriendsQuery(profileId) {
    dispatch(getAllFriends(profileId));
  }

  // NaN API Tasks

  function handleResetRequestError() {
    dispatch(resetRequestError());
  }

  return {
    sendFriendRequestQuery,
    cancelFriendRequestQuery,
    deleteFriendRequestQuery,
    confirmFriendRequestQuery,
    deleteFriendQuery,
    getPendingRequestsQuery,
    getSentRequestsQuery,
    getAllFriendsQuery,
    // NaN API Tasks
    handleResetRequestError,
  };
}

export default useFriendsQuery;
