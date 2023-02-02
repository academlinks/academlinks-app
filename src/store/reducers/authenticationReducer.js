import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: "",
    },

    registerLoadingState: {
      loading: false,
      error: false,
      message: "",
    },

    resetPasswordIsSuccessfullySet: {
      success: null,
      message: "",
    },

    passwordIsSuccessfullyUpdated: {
      success: null,
      message: "",
    },

    registrationSuccessfullySent: null,

    isExistingRegister: false,
    successfullRegistration: false,
  },
  reducers: {
    // SECTION: Error Setters And Reseters
    setLoadingStateError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = true;
      state.loadingState.message = payload.message;
    },

    resetLoadingStateError(state, { payload }) {
      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setRegistrationError(state, { payload }) {
      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = true;
      state.registerLoadingState.message = payload.message;
    },

    resetRegistrationError(state) {
      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
      state.isExistingRegister = false;
      state.successfullRegistration = false;
      state.registrationSuccessfullySent = null;
    },

    // SECTION: Forgot Password

    sendForgotPassword(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setSuccessfullForgotPassword(state, { payload }) {
      state.resetPasswordIsSuccessfullySet = payload;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    resetSuccessfullForgotPassword(state) {
      state.resetPasswordIsSuccessfullySet = {
        success: null,
        message: "",
      };
    },

    updateForgotPassword(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setSuccessfullUpdateForgotPassword(state, { payload }) {
      state.passwordIsSuccessfullyUpdated = payload;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    resetSuccessfullUpdateForgotPassword(state) {
      state.passwordIsSuccessfullyUpdated = {
        success: null,
        message: "",
      };
    },

    // SECTION: Registration

    // SECTION-SUB-RELATED: Send Registration Request

    checkExistingRegister(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    setIsExistingRegister(state, { payload }) {
      state.isExistingRegister = payload.isExistingRequest;

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    sendRegistrationRequest(state) {
      state.registerLoadingState.loading = true;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    setRegistrationRequestSuccess(state) {
      state.registrationSuccessfullySent = true;

      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    // SECTION-SUB-RELATED: Confirm Registration

    sendRegisterPasswordConfirm(state) {
      state.registerLoadingState.loading = true;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    setRegisterSuccess(state, { payload }) {
      state.successfullRegistration = payload.success;

      state.registerLoadingState.loading = false;
      state.registerLoadingState.error = false;
      state.registerLoadingState.message = "";
    },

    // SECTION-SUB-RELATED: End Registration

    resetRegistrationpProccess(state) {
      state.isExistingRegister = false;
      state.successfullRegistration = false;
    },
  },
});

export default authenticationSlice.reducer;
export const {
  // Error Setters And Reseters
  setLoadingStateError,
  resetLoadingStateError,
  setRegistrationError,
  resetRegistrationError,
  // Forgot Password
  sendForgotPassword,
  setSuccessfullForgotPassword,
  resetSuccessfullForgotPassword,
  updateForgotPassword,
  setSuccessfullUpdateForgotPassword,
  resetSuccessfullUpdateForgotPassword,
  // Registration
  // -> Send Registration Request
  checkExistingRegister,
  setIsExistingRegister,
  sendRegistrationRequest,
  setRegistrationRequestSuccess,
  // -> Confirm Registration
  sendRegisterPasswordConfirm,
  setRegisterSuccess,
  // -> End Registration
  resetRegistrationpProccess,
} = authenticationSlice.actions;
