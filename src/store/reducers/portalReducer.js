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

const portalSlice = createSlice({
  name: "portal",
  initialState: {
    //////////////////////////////
    /// show post media modal ///
    ////////////////////////////
    mediaModalIsOpen: false,
    activeMediaIndex: "",
    mediaFiles: null,

    //////////////////////////////
    /// show share post modal ///
    ////////////////////////////
    sharePostLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    sharePostModalIsOpen: false,
    sharePostData: {
      _id: "",
      type: "",
      authenticType: "",
      author: {
        userName: "",
        profileImg: "",
      },
      createdAt: "",
      description: "",
      media: null,
      tags: [],
      authenticTags: [],
      article: "",
      title: "",
      labels: [],
      category: "",
      audience: "",
    },

    shareAudience: "public",
  },
  reducers: {
    ////////////////////////////
    /// Aactive Media Files ///
    //////////////////////////
    setMediaModalOpen(state, { payload }) {
      const { index, media } = payload;
      state.activeMediaIndex = index;
      state.mediaFiles = media;
      state.mediaModalIsOpen = true;
    },

    deactivateMediaModal(state) {
      state.mediaModalIsOpen = false;
      state.mediaFiles = null;
      state.activeMediaIndex = "";
    },

    ////////////////////
    /// Share Portal ///
    ////////////////////
    setSharePostError(state, { payload }) {
      updateLoadingState({
        state,
        key: "sharePostLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    sharePost(state) {
      updateLoadingState({
        state,
        key: "sharePostLoadingState",
      });
    },

    setSharePostModalOpen(state, { payload }) {
      Object.keys(state.sharePostData).forEach(
        (key) => (state.sharePostData[key] = payload[key])
      );

      state.sharePostModalIsOpen = true;
    },

    setShareAudience(state, { payload }) {
      state.shareAudience = payload;
    },

    addShareTag(state, { payload }) {
      addTag(state, "sharePostData", payload);
    },

    removeShareTag(state, { payload }) {
      removeTag(state, "sharePostData", payload);
    },

    resetSharePostModal(state) {
      state.sharePostModalIsOpen = false;

      Object.keys(state.sharePostData).map(
        (key) => (state.sharePostData[key] = "")
      );

      state.shareAudience = "public";

      updateLoadingState({
        state,
        key: "sharePostLoadingState",
        loading: false,
      });
    },
  },
});

export default portalSlice.reducer;

export const {
  // Aactive Media Files
  setMediaModalOpen,
  deactivateMediaModal,

  // Share Portal
  setSharePostError,
  sharePost,
  setSharePostModalOpen,
  setShareAudience,
  addShareTag,
  removeShareTag,
  resetSharePostModal,
} = portalSlice.actions;

function addTag(state, key, payload) {
  state[key].tags = [...state[key].tags, payload];
}

function removeTag(state, key, payload) {
  state[key].tags = state[key].tags.filter((tag) => tag._id !== payload);
}
