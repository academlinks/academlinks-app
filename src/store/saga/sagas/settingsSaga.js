import { takeLatest } from "redux-saga/effects";

import {
  addUserInfo,
  updateUserNestedInfo,
  deleteUserInfo,
  deleteNestedUserInfo,
  getUserInfo,
  updatePassword,
  updateEmail,
} from "../../reducers/settingsReducer";

import {
  addUserInfoHandler,
  updateNestedUserInfoHandler,
  deleteUserInfoHandler,
  deleteNestedUserInfoHandler,
  getUserInfoHandler,
  updatePasswordHandler,
  updateEmailHandler,
} from "../handlers/settingsHandler";

export default function* settingsSaga() {
  yield takeLatest(getUserInfo, getUserInfoHandler);
  yield takeLatest(addUserInfo, addUserInfoHandler);
  yield takeLatest(updateUserNestedInfo, updateNestedUserInfoHandler);
  yield takeLatest(deleteUserInfo, deleteUserInfoHandler);
  yield takeLatest(deleteNestedUserInfo, deleteNestedUserInfoHandler);
  yield takeLatest(updatePassword, updatePasswordHandler);
  yield takeLatest(updateEmail, updateEmailHandler);
}
