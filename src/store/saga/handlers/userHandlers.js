import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "store/saga/handlers/errorHandler";

import {
  setUserError,
  setSearchError,
  setUserProfile,
  setSearchResult,
} from "store/reducers/userReducer";

import { queryUserProfile, queryUserSearch } from "store/saga/api/userQueries";

export function* searchUserHandler({ payload: key }) {
  try {
    const { data } = yield call(queryUserSearch, key);
    yield put(setSearchResult(data));
  } catch (error) {
    yield showError({
      error,
      location: "searchUserHandler",
      setter: setSearchError,
      setterParams: { message: errorMessages.user.load },
    });
  }
}

export function* getUserProfileHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserProfile, userId);
    yield put(setUserProfile(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserProfileHandler",
      setter: setUserError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}
