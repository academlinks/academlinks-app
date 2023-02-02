import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setActiveUser,
  setLoadingStateError,
  setLogout,
} from "../../reducers/activeUserReducer";

import {
  setLoadingStateError as setAuthLoadingError,
  setRegistrationError,
  setRegisterSuccess,
  setIsExistingRegister,
  setRegistrationRequestSuccess,
  setSuccessfullForgotPassword,
  setSuccessfullUpdateForgotPassword,
} from "../../reducers/authenticationReducer";

import {
  loginQuery,
  logOutQuery,
  checkRegistrationExistanceQuery,
  sendRegistrationPasswordConfirmQuery,
  sendRegistrationRequestQuery,
  sendForgotPasswordQuery,
  sendUpdateForgotPasswordQuery,
  deleteAccountQuery,
} from "../api/authenticationQueries";

export function* loginHandler({ payload }) {
  try {
    const { data } = yield call(loginQuery, payload);
    yield put(setActiveUser(data));
  } catch (error) {
    yield showError({
      error,
      location: "loginHandler",
      setter: setLoadingStateError,
      setterParams: {
        message: errorMessages.user.auth,
      },
    });
  }
}

export function* logOutHandler({ payload }) {
  try {
    yield call(logOutQuery);
    yield put(setLogout());
  } catch (error) {
    yield showError({ error, location: "logOutHandler" });
  }
}

export function* checkExistingRegisterHandler({
  payload: { requestId, tokenId },
}) {
  try {
    const { data } = yield call(checkRegistrationExistanceQuery, {
      requestId,
      tokenId,
    });

    yield put(setIsExistingRegister(data));
  } catch (error) {
    yield showError({
      error,
      location: "chechExistingRegisterHandler",
      setter: setAuthLoadingError,
      setterParams: { message: errorMessages.user.operation },
    });
  }
}

export function* sendRegistrationPasswordConfirmHandler({
  payload: { requestId, tokenId, body },
}) {
  try {
    const { data } = yield call(sendRegistrationPasswordConfirmQuery, {
      body,
      requestId,
      tokenId,
    });
    yield put(setRegisterSuccess(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendRegistrationPasswordConfirmHandler",
      setter: setRegistrationError,
      setterParams: { message: "" },
    });
  }
}

export function* sendRegistrationRequestHandler({ payload }) {
  try {
    yield call(sendRegistrationRequestQuery, payload);
    yield put(setRegistrationRequestSuccess());
  } catch (error) {
    yield showError({
      error,
      location: "sendRegistrationRequest",
      setter: setRegistrationError,
      setterParams: { message: errorMessages.user.sendRegRequest },
    });
  }
}

export function* sendForgotPasswordHandler({ payload }) {
  try {
    const { data } = yield call(sendForgotPasswordQuery, payload);
    yield put(setSuccessfullForgotPassword(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendForgotPasswordHandler",
      setter: setAuthLoadingError,
      setterParams: {
        message: errorMessages.user.operation,
      },
    });
  }
}

export function* sendUpdateForgotPasswordHandler({ payload }) {
  try {
    const { data } = yield call(sendUpdateForgotPasswordQuery, payload);
    yield put(setSuccessfullUpdateForgotPassword(data));
  } catch (error) {
    yield showError({
      error,
      location: "sendUpdateForgotPasswordHandler",
      setter: setAuthLoadingError,
      setterParams: {
        message: errorMessages.user.operation,
      },
    });
  }
}

export function* deleteAccountHandler({ payload }) {
  try {
    yield call(deleteAccountQuery, payload);
    yield put(setLogout());
  } catch (error) {
    yield showError({
      error,
      location: "deleteAccountHandler",
      setter: setLoadingStateError,
      setterParams: errorMessages.user.operation,
    });
  }
}
