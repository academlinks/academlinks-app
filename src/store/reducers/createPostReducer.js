import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    createBlogPostError: {
      error: false,
      title: {
        hasError: false,
        message: "",
      },
      labels: {
        hasError: false,
        message: "",
      },
      category: {
        hasError: false,
        message: "",
      },
      article: {
        hasError: false,
        message: "",
      },
    },
    createPostError: {
      error: false,
      message: "",
    },
    postData: {
      _id: "",
      type: "",
      shared: "",
      authenticAuthorId: "",
      authenticAuthorImg: "",
      authenticAuthorName: "",
      authenticDescription: "",
      authenticTags: [],
      createdAt: "",
      description: "",
      article: "",
      title: "",
      labels: [],
      tags: [],
      category: "",
      audience: "public",
      media: [],
      files: [],
    },
    createPostIsOpen: false,
    createBlogPostIsOpen: false,
    updatePostModalIsOpen: false,
    updateBlogPostModalIsOpen: false,
    // activeSelectedMedia: false,
    // updatePostMediaFiles: [],
  },
  reducers: {
    ///////////////////////
    /// Error Handling ///
    /////////////////////

    // used for API Error

    setCreatePostError(state, { payload }) {
      state.loadingState.error = true;
      state.loadingState.loading = false;
      state.loadingState.message = payload.message;
    },

    // validation errors

    setCreateBlogPostValidationError(state, { payload }) {
      state.createBlogPostError = payload;
    },

    resetCreateBlogPostValidationErrorFragment(state, { payload: { target } }) {
      state.createBlogPostError[target] = {
        hasError: false,
        message: false,
      };
    },

    setCreatePostValidationError(state, { payload }) {
      state.createPostError = payload;
    },

    resetCreatePostValidationError(state) {
      state.createPostError = {
        error: false,
        message: "",
      };
    },

    ////////////////
    /// trigers ///
    //////////////

    createPost(state) {
      state.loadingState.error = false;
      state.loadingState.loading = true;
      state.loadingState.message = "";
    },

    updatePost(state) {
      state.loadingState.error = false;
      state.loadingState.loading = true;
      state.loadingState.message = "";
    },

    resetCreatePost(state) {
      if (state.createPostIsOpen) state.createPostIsOpen = false;
      else if (state.createBlogPostIsOpen) state.createBlogPostIsOpen = false;
      else if (state.updatePostModalIsOpen) state.updatePostModalIsOpen = false;
      else if (state.updateBlogPostModalIsOpen)
        state.updateBlogPostModalIsOpen = false;

      state.postData = reset().postData;
      state.loadingState = reset().loadingState;
    },

    //////////////////////////////
    /// Open And Close Modals ///
    ////////////////////////////

    setCreatePostIsOpen(state, { payload }) {
      state.createPostIsOpen = payload;

      if (payload === false) {
        state.postData = reset().postData;
        if (state.loadingState.error) state.loadingState = reset().loadingState;
      }
    },

    setUpdatePostModalOpen(state, { payload }) {
      const keys = Object.keys(payload);
      keys[0] && keys.forEach((key) => (state.postData[key] = payload[key]));

      state.updatePostModalIsOpen = true;
    },

    setUpdatePostModalClose(state) {
      state.updatePostModalIsOpen = false;
      state.postData = reset().postData;
      if (state.loadingState.error) state.loadingState = reset().loadingState;
    },

    setCreateBlogPostIsOpen(state, { payload }) {
      state.createBlogPostIsOpen = payload;

      if (payload === false) {
        state.postData = reset().postData;
        if (state.loadingState.error) state.loadingState = reset().loadingState;
      }
    },

    setUpdateBlogPostData(state, { payload }) {
      const keys = Object.keys(payload);
      keys[0] && keys.forEach((key) => (state.postData[key] = payload[key]));

      state.updateBlogPostModalIsOpen = true;
    },

    setUpdateBlogPostModalClose(state) {
      state.updateBlogPostModalIsOpen = false;
      state.postData = reset().postData;
      if (state.loadingState.error) state.loadingState = reset().loadingState;
    },

    /////////////
    /// Crud ///
    ///////////

    // crossOver CRUD
    setAudience(state, { payload }) {
      state.postData.audience = payload;
    },

    addTag(state, { payload }) {
      state.postData.tags = [...state.postData.tags, payload];
    },

    removeTag(state, { payload }) {
      state.postData.tags = state.postData.tags.filter(
        (tag) => tag._id !== payload
      );
    },

    setFile(state, { payload }) {
      Object.values(payload)
        .filter(
          (file) =>
            !Object.values(state.postData.files).some(
              (existingFile) => existingFile.name === file.name
            )
        )
        .map((file) => state.postData.files.push(file));
    },

    removeFiles(state, { payload }) {
      const url = payload;

      if (url !== "all") {
        if (typeof url === "object") {
          state.postData.files = state.postData.files.filter(
            (file) => typeof file === "object" && file.name !== url.name
          );
        } else if (typeof payload === "string") {
          state.postData.media = state.postData.media.filter(
            (media) => typeof media === "string" && media !== url
          );
        }
      } else {
        state.postData.files = [];
        state.postData.media = [];
      }
    },

    // post Crud
    setDescription(state, { payload }) {
      state.postData.description = payload;
    },

    // blog post CRUD
    setTitle(state, { payload }) {
      state.postData.title = payload;
    },

    addLabel(state, { payload }) {
      state.postData.labels = [...state.postData.labels, payload];
    },

    removeLabel(state, { payload }) {
      state.postData.labels = state.postData.labels.filter(
        (label) => label !== payload
      );
    },

    setCategory(state, { payload }) {
      state.postData.category = payload;
    },

    setArticle(state, { payload }) {
      state.postData.article = payload;
    },
  },
});

export default createPostSlice.reducer;
export const {
  ///////////////////////
  /// Error Handling ///
  /////////////////////
  // used for API Error
  setCreatePostError,
  // validation errors
  setCreateBlogPostValidationError,
  resetCreateBlogPostValidationErrorFragment,
  setCreatePostValidationError,
  resetCreatePostValidationError,
  ////////////////
  /// trigers ///
  //////////////
  updatePost,
  createPost,
  resetCreatePost,
  //////////////////////////////
  /// Open And Close Modals ///
  ////////////////////////////
  setCreatePostIsOpen,
  setUpdatePostModalOpen,
  setUpdatePostModalClose,
  setCreateBlogPostIsOpen,
  setUpdateBlogPostData,
  setUpdateBlogPostModalClose,
  /////////////
  /// Crud ///
  ///////////
  // crossOver CRUD
  setAudience,
  addTag,
  removeTag,
  setFile,
  removeFiles,
  // post Crud
  setDescription,
  // blog post Crud
  setTitle,
  addLabel,
  removeLabel,
  setCategory,
  setArticle,
} = createPostSlice.actions;

function reset() {
  return {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    postData: {
      _id: "",
      type: "",
      shared: "",
      authenticAuthorId: "",
      authenticAuthorImg: "",
      authenticAuthorName: "",
      authenticDescription: "",
      authenticTags: [],
      createdAt: "",
      description: "",
      title: "",
      article: "",
      labels: [],
      tags: [],
      category: "",
      audience: "public",
      media: [],
      files: [],
    },
    createBlogPostError: {
      error: false,
      title: {
        hasError: false,
        message: "",
      },
      labels: {
        hasError: false,
        message: "",
      },
      category: {
        hasError: false,
        message: "",
      },
      article: {
        hasError: false,
        message: "",
      },
    },
    createPostError: {
      error: false,
      message: "",
    },
  };
}
