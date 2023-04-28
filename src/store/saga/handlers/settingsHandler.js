import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "store/saga/handlers/errorHandler";

import {
  setUserInfo,
  setUserInfoFragment,
  setUpdateError,
  setLoadingError,
  setDeletedUserInfo,
  setUpdatedPassword,
  setUpdatedEmail,
} from "store/reducers/settingsReducer";

import { setUserNewEmail } from "store/reducers/activeUserReducer";

import {
  addUserInfoQuery,
  updateNestedUserInfoQuery,
  deleteUserInfoQuery,
  deleteNestedUserInfoQuery,
  getUserInfoQuery,
  updateEmailQuery,
  updatePasswordQuery,
} from "store/saga/api/settingsQueries";

export function* getUserInfoHandler({ payload }) {
  try {
    const { data } = yield call(getUserInfoQuery, payload);
    yield put(setUserInfo(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserInfoHandler",
      setter: setLoadingError,
      setterParams: {
        message: errorMessages.settings.load,
      },
    });
  }
}

export function* addUserInfoHandler({ payload }) {
  try {
    const { data } = yield call(addUserInfoQuery, payload);
    yield put(setUserInfoFragment({ data, field: payload.field }));
  } catch (error) {
    yield showError({
      error,
      location: "addUserInfoHandler",
      setter: setUpdateError,
      setterParams: {
        message: errorMessages.settings.update,
      },
    });
  }
}

export function* updateNestedUserInfoHandler({ payload }) {
  try {
    const { data } = yield call(updateNestedUserInfoQuery, payload);
    yield put(setUserInfoFragment({ data, field: payload.field }));
  } catch (error) {
    yield showError({
      error,
      location: "updateNestedUserInfoHandler",
      setter: setUpdateError,
      setterParams: {
        message: errorMessages.settings.update,
      },
    });
  }
}

export function* deleteUserInfoHandler({ payload }) {
  try {
    yield call(deleteUserInfoQuery, payload);
    yield put(setDeletedUserInfo({ field: payload.field }));
  } catch (error) {
    yield showError({
      error,
      location: "deleteUserInfoHandler",
    });
  }
}

export function* deleteNestedUserInfoHandler({ payload }) {
  try {
    const { data } = yield call(deleteNestedUserInfoQuery, payload);
    yield put(setUserInfoFragment({ data, field: payload.field }));
  } catch (error) {
    yield showError({
      error,
      location: "deleteNestedUserInfoHandler",
    });
  }
}

export function* updatePasswordHandler({ payload }) {
  try {
    const { data } = yield call(updatePasswordQuery, payload);
    yield put(setUpdatedPassword(data));
  } catch (error) {
    yield showError({
      error,
      location: "updatePasswordHandler",
      setter: setUpdateError,
      setterParams: {
        message: errorMessages.settings.update,
      },
    });
  }
}

export function* updateEmailHandler({ payload }) {
  try {
    const { data } = yield call(updateEmailQuery, payload);
    yield put(setUpdatedEmail(data));
    yield put(setUserNewEmail(data.email));
  } catch (error) {
    yield showError({
      error,
      location: "updateEmailHandler",
    });
  }
}
