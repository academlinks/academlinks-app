import { createSlice } from "@reduxjs/toolkit";

function updateRequestError({ state, error = false, task, message }) {
  state.requestError.error = error;
  state.requestError.message = error ? message : "";
  state.requestError.task = error ? task : "";
}

function updateLoadingState({ state, loading = true, error = false, message }) {
  state.loadingState.loading = loading;
  state.loadingState.error = error;
  state.loadingState.message = error ? message : "";
}

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    requestError: {
      error: false,
      message: "",
      task: "", // coluld be "send" | "cancel" | "confirm" | "deletion" | "remove" (delete friend)
    },
    allFriends: [],
    pendingRequests: [],
    sentRequests: [],
    searchKey: "",
  },
  reducers: {
    setRequestError(state, { payload }) {
      updateRequestError({
        state,
        error: true,
        message: payload.message,
        task: payload.task,
      });
    },

    setLoadingError(state, { payload }) {
      updateLoadingState({
        state,
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetRequestError(state) {
      updateRequestError({ state });
    },

    setSearchKey(state, { payload }) {
      state.searchKey = payload;
    },

    sendFriendRequest() {},

    cancelFriendRequest() {},

    deleteFriendRequest() {},

    confirmFriendRequest() {},

    deleteFriend() {},

    getAllFriends(state) {
      updateLoadingState({ state });
    },

    setFriends(state, { payload }) {
      state.allFriends = payload.map((friend) => ({
        ...friend.friend,
        muntual: friend.muntual,
      }));
      updateLoadingState({ state, loading: false });
    },

    setDeletedFriend(state, { payload }) {
      state.allFriends = state.allFriends.filter(
        (friend) => friend._id !== payload
      );
    },

    getPendingRequests(state) {
      updateLoadingState({ state });
    },

    setPendingRequests(state, { payload }) {
      state.pendingRequests = state.sentRequests = payload.map((req) => ({
        ...req.pendingRequest,
        muntuals: req.muntuals,
      }));

      updateLoadingState({ state, loading: false });
    },

    setDeletedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request.adressat._id !== payload
      );
    },

    setConfirmedRequest(state, { payload }) {
      state.pendingRequests = state.pendingRequests.filter(
        (request) => request._id !== payload
      );
    },

    getSentRequests(state) {
      updateLoadingState({ state });
    },

    setSentRequests(state, { payload }) {
      state.sentRequests = payload.map((req) => ({
        ...req.sentRequest,
        muntuals: req.muntuals,
      }));

      updateLoadingState({ state, loading: false });
    },

    setCanceledRequest(state, { payload }) {
      state.sentRequests = state.sentRequests.filter(
        (request) => request._id !== payload
      );
    },

    resetFriends(state) {
      if (state.allFriends[0]) state.allFriends = [];
      else if (state.pendingRequests[0]) state.pendingRequests = [];
      else if (state.sentRequests[0]) state.sentRequests = [];
    },
  },
});

export default friendsSlice.reducer;
export const {
  setRequestError,
  resetRequestError,
  setLoadingError,
  setSearchKey,
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  confirmFriendRequest,
  deleteFriend,
  getAllFriends,
  setFriends,
  setDeletedFriend,
  getPendingRequests,
  setPendingRequests,
  setDeletedRequest,
  setConfirmedRequest,
  getSentRequests,
  setSentRequests,
  setCanceledRequest,
  resetFriends,
} = friendsSlice.actions;
