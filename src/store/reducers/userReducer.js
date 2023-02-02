import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  key,
  loading = true,
  error = false,
  message,
}) {
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    searchLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    user: {},
    searchResult: [],
  },

  reducers: {
    // SECTION: ======= Error Setters And Reseters ======== //
    setUserError(state, { payload }) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetUserError(state) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
      });
    },

    setSearchError(state, { payload }) {
      updateLoadingState({
        state,
        key: "searchLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetSearchError(state) {
      updateLoadingState({
        state,
        key: "searchLoadingState",
        loading: false,
        error: false,
      });
    },

    // SECTION: ======= Searching ======== //

    searchUser(state) {
      updateLoadingState({ state, key: "searchLoadingState" });
    },

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
      updateLoadingState({ state, key: "searchLoadingState", loading: false });
    },

    resetSearchResult(state) {
      state.searchResult = [];
      updateLoadingState({ state, key: "searchLoadingState" });
    },

    // SECTION: ======= User Related ======== //

    getUserProfile(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    setUserProfile(state, { payload }) {
      state.user = {};
      Object.keys(payload).map((key) => (state.user[key] = payload[key]));

      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setNewFriend(state, { payload }) {
      state.user.friends.unshift(payload);
      state.user.friendsAmount = state.user.friendsAmount += 1;
    },
  },
});

export default userSlice.reducer;
export const {
  // SECTION-RELATED: ======= Error Setters And Reseters ======== //
  setUserError,
  resetUserError,
  setSearchError,
  resetSearchError,
  // SECTION-RELATED: ======= Searching ======== //
  searchUser,
  setSearchResult,
  resetSearchResult,
  // SECTION-RELATED: ======= User Related ======== //
  getUserProfile,
  setUserProfile,
  setNewFriend,
} = userSlice.actions;
