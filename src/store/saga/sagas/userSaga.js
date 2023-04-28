import { takeLatest } from "redux-saga/effects";

import { searchUser, getUserProfile } from "store/reducers/userReducer";

import {
  searchUserHandler,
  getUserProfileHandler,
} from "store/saga/handlers/userHandlers";

export default function* userSaga() {
  yield takeLatest(getUserProfile, getUserProfileHandler);
  yield takeLatest(searchUser, searchUserHandler);
}
