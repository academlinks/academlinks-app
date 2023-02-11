import { createSlice } from "@reduxjs/toolkit";

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: "",
    },

    user: {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      profileImg: "",
      coverImg: "",
      role: "",
      createdAt: null,
      isAuthenticated: false,
    },
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

    // SECTION: Authentication

    login(state) {
      state.loadingState.loading = true;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    logOut(state) {
      const temp = {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        profileImg: "",
        coverImg: "",
        createdAt: null,
        role: "",
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.removeItem("academind_passport");

      if (state.loadingState.loading) {
        state.loadingState = {
          loading: false,
          error: false,
          message: "",
        };
      }
    },

    deleteAccount(state) {
      state.loadingState = {
        loading: true,
        error: false,
        message: "",
      };
    },

    // SECTION: User

    setActiveUser(state, { payload }) {
      const temp = {
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        profileImg: payload.profileImg,
        coverImg: payload.coverImg,
        createdAt: payload.createdAt,
        role: payload.role,
        isAuthenticated: true,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
      localStorage.setItem(
        "academind_passport",
        JSON.stringify(payload.accessToken)
      );

      state.loadingState.loading = false;
      state.loadingState.error = false;
      state.loadingState.message = "";
    },

    resetActiveUser(state) {
      const temp = {
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        profileImg: "",
        coverImg: "",
        createdAt: null,
        role: "",
        isAuthenticated: false,
      };

      Object.keys(state.user).map((key) => (state.user[key] = temp[key]));
    },

    // SECTION: Update Active User

    setUpdatedUserCover(state, { payload }) {
      const { field, value } = payload;
      state.user[field] = value;
    },

    setUserNewEmail(state, { payload }) {
      state.user.email = payload;
    },
  },
});

export default activeUserSlice.reducer;

export const {
  // Error Setters And Reseters
  setLoadingStateError,
  resetLoadingStateError,
  // Authenntication
  login,
  logOut,
  deleteAccount,
  setLogout,
  // user
  setActiveUser,
  resetActiveUser,
  // Update Active User
  setUpdatedUserCover,
  setUserNewEmail,
} = activeUserSlice.actions;
