import { takeLatest } from "redux-saga/effects";

import {
  checkExistingRegister,
  sendRegisterPasswordConfirm,
  sendRegistrationRequest,
  sendForgotPassword,
  updateForgotPassword,
} from "store/reducers/authenticationReducer";

import { login, logOut, deleteAccount } from "store/reducers/activeUserReducer";

import {
  loginHandler,
  logOutHandler,
  checkExistingRegisterHandler,
  sendRegistrationPasswordConfirmHandler,
  sendRegistrationRequestHandler,
  sendForgotPasswordHandler,
  sendUpdateForgotPasswordHandler,
  deleteAccountHandler,
} from "store/saga/handlers/authenticationHandlers";

export default function* authenticationSaga() {
  yield takeLatest(login, loginHandler);
  yield takeLatest(logOut, logOutHandler);
  yield takeLatest(sendForgotPassword, sendForgotPasswordHandler);
  yield takeLatest(updateForgotPassword, sendUpdateForgotPasswordHandler);
  yield takeLatest(checkExistingRegister, checkExistingRegisterHandler);
  yield takeLatest(sendRegistrationRequest, sendRegistrationRequestHandler);
  yield takeLatest(deleteAccount, deleteAccountHandler);
  yield takeLatest(
    sendRegisterPasswordConfirm,
    sendRegistrationPasswordConfirmHandler
  );
}
