import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import { isRoute } from "../../../lib/window-location";

import {
  setRequestError,
  setLoadingError,
  setFriends,
  setPendingRequests,
  setDeletedRequest,
  setConfirmedRequest,
  setSentRequests,
  setCanceledRequest,
  setDeletedFriend,
} from "../../reducers/friendsReducer";

import {
  querySendRequest,
  queryCancelRequest,
  queryDeleteRequest,
  queryConfirmRequest,
  queryDeleteFriend,
  queryGetAllFriends,
  queryGetPendingRequests,
  queryGetSentRequests,
} from "../api/friendsQueries";

import { setNewFriend } from "../../reducers/userReducer";

export function* sendRequestHandler({ payload: userId }) {
  try {
    yield call(querySendRequest, userId);
  } catch (error) {
    yield showError({
      error,
      location: "sendRequestHandler",
      setter: setRequestError,
      setterParams: {
        task: "send",
        message: errorMessages.requests.send,
      },
    });
  }
}

export function* cancelRequestHandler({ payload: userId }) {
  try {
    yield call(queryCancelRequest, userId);
    if (isRoute("sent-requests")) yield put(setCanceledRequest(userId));
  } catch (error) {
    yield showError({
      error,
      location: "cancelRequestHandler",
      setter: setRequestError,
      setterParams: {
        task: "cancel",
        message: errorMessages.requests.cancel,
      },
    });
  }
}

export function* deleteRequestHandler({ payload: userId }) {
  try {
    yield call(queryDeleteRequest, userId);
    if (isRoute("pending-requests")) yield put(setDeletedRequest(userId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteRequestHandler",
      setter: setRequestError,
      setterParams: {
        task: "deletion",
        message: errorMessages.requests.deletion,
      },
    });
  }
}

export function* confirmRequestHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryConfirmRequest, userId);

    if (isRoute("pending-requests")) {
      yield put(setNewFriend(data));
      yield put(setConfirmedRequest(userId));
    }
  } catch (error) {
    yield showError({
      error,
      location: "confirmRequestHandler",
      setter: setRequestError,
      setterParams: {
        task: "confirm",
        message: errorMessages.requests.confirm,
      },
    });
  }
}

export function* deleteFriendtHandler({ payload: userId }) {
  try {
    yield call(queryDeleteFriend, userId);
    if (isRoute("all-friends")) yield put(setDeletedFriend(userId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteFriendtHandler",
      setter: setRequestError,
      setterParams: {
        task: "remove",
        message: errorMessages.requests.remove,
      },
    });
  }
}

export function* getAllFriendsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetAllFriends, userId);
    yield put(setFriends(data));
  } catch (error) {
    yield showError({
      error,
      location: "getAllFriendsHandler",
      setter: setLoadingError,
      setterParams: {
        message: errorMessages.requests.load,
      },
    });
  }
}

export function* getPendingRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingRequests, userId);
    yield put(setPendingRequests(data));
  } catch (error) {
    yield showError({
      error,
      location: "getPendingRequestsHandler",
      setter: setLoadingError,
      setterParams: {
        message: errorMessages.requests.load,
      },
    });
  }
}

export function* getSentRequestsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetSentRequests, userId);
    yield put(setSentRequests(data));
  } catch (error) {
    yield showError({
      error,
      location: "getSentRequestsHandler",
      setter: setLoadingError,
      setterParams: {
        message: errorMessages.requests.load,
      },
    });
  }
}
