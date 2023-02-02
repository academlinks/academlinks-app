import { takeLatest } from "redux-saga/effects";

import { searchUser, getUserProfile } from "../../reducers/userReducer";

import {
  searchUserHandler,
  getUserProfileHandler,
} from "../handlers/userHandlers";

export default function* userSaga() {
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(searchUser, searchUserHandler);
}
