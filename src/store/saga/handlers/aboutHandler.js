import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import { setUserAboutData, setAboutError } from "../../reducers/aboutReducer";

import { queryUserAboutData } from "../api/aboutQueries";

export function* getUserAboutDataHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserAboutData, userId);
    yield put(setUserAboutData(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserAboutDataHandler",
      setter: setAboutError,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}
