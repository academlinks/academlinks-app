import { takeLatest } from "redux-saga/effects";

import { getUserAboutData } from "store/reducers/aboutReducer";

import { getUserAboutDataHandler } from "store/saga/handlers/aboutHandler";

export default function* aboutSaga() {
  yield takeLatest(getUserAboutData, getUserAboutDataHandler);
}
