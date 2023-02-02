import { takeLatest } from "redux-saga/effects";

import {
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
  getAllFriends,
  getPendingRequests,
  getSentRequests,
} from "../../reducers/friendsReducer";

import {
  sendRequestHandler,
  cancelRequestHandler,
  deleteRequestHandler,
  confirmRequestHandler,
  deleteFriendtHandler,
  getAllFriendsHandler,
  getPendingRequestsHandler,
  getSentRequestsHandler,
} from "../handlers/friendsHandlers";

export default function* friendsSaga() {
  yield takeLatest(sendFriendRequest, sendRequestHandler);
  yield takeLatest(cancelFriendRequest, cancelRequestHandler);
  yield takeLatest(deleteFriendRequest, deleteRequestHandler);
  yield takeLatest(confirmFriendRequest, confirmRequestHandler);
  yield takeLatest(deleteFriend, deleteFriendtHandler);
  yield takeLatest(getAllFriends, getAllFriendsHandler);
  yield takeLatest(getPendingRequests, getPendingRequestsHandler);
  yield takeLatest(getSentRequests, getSentRequestsHandler);
}
