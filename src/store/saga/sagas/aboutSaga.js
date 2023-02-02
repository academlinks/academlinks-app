import { takeLatest } from "redux-saga/effects";

import { getUserAboutData } from "../../reducers/aboutReducer";

import { getUserAboutDataHandler } from "../handlers/aboutHandler";

export default function* aboutSaga() {
  yield takeLatest(getUserAboutData, getUserAboutDataHandler);
}
