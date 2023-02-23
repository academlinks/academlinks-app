import { createSlice } from "@reduxjs/toolkit";

const postsDataSlice = createSlice({
  name: "PostsData",
  initialState: {
    operationalLoadingState: {
      loading: false,
      error: false,
      message: "",
      task: "", // "get" | "deletion" | "audience" | "save" | "showOnProfile" | "addToProfile" | "hide" | "removeTag" |
    },
    loadingState: { loading: false, error: false, message: "" },
    publishersLoadingState: { loading: false, error: false, message: "" },
    topRatedPostsLoadingState: { loading: false, error: false, message: "" },
    relatedPostsLoadingState: { loading: false, error: false, message: "" },
    posts: [],
    topRatedBlogPosts: [],
    topRatedPublishers: [],
    relatedPosts: [],
    results: "",
    sliderBlogPosts: [],
  },
  reducers: {
    // SECTION: ======= Error Setters And Reseters ======== //

    setErrorOnPostOperation(state, { payload }) {
      updateOperationalLoadingState({
        state,
        loading: false,
        error: true,
        message: payload.message,
        task: payload.task,
      });
    },

    resetErrorOnPostOperation(state) {
      updateOperationalLoadingState({
        state,
        loading: false,
        error: false,
        message: "",
        task: "",
      });
    },

    setErrorOnLoadingState(state, { payload }) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetErrorOnLoadingState(state, { payload }) {
      updateLoadingState({
        state,
        key: "loadingState",
        loading: false,
        error: false,
        message: "",
      });
    },

    setErrorOnTopRatedPublishers(state, { payload }) {
      updateLoadingState({
        state,
        key: "publishersLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    setErrorOnTopRatedBlogPosts(state, { payload }) {
      updateLoadingState({
        state,
        key: "topRatedPostsLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    setErrorOnRelatedBlogPosts(state, { payload }) {
      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
        loading: false,
        error: true,
        message: payload.message,
      });
    },

    resetPosts(state) {
      if (state.posts[0]) state.posts = [];
      if (state.topRatedBlogPosts[0]) state.topRatedBlogPosts = [];
      if (state.topRatedPublishers[0]) state.topRatedPublishers = [];
      if (state.relatedPosts[0]) state.relatedPosts = [];
      state.results = "";
    },

    // SECTION: ======= Global Setters And Getters ======== //

    getPost(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    setPosts(state, { payload }) {
      const { data, results } = payload;

      if (typeof results === "number" && results >= 0) {
        state.results = results;
        state.posts = [...data];
      } else if (!results) {
        state.posts = [...state.posts, ...data];
      }

      if (state.loadingState.loading)
        updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setNewPost(state, { payload }) {
      state.posts = [payload, ...state.posts];
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    setSinglePost(state, { payload }) {
      state.posts = [payload];
      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    //trigger is called in comments reducer
    encreasePostCommentCount(state, { payload }) {
      const i = state.posts.findIndex((post) => post._id === payload);
      state.posts[i].commentsAmount += 1;
    },

    //trigger is called in comments reducer
    decreasePostCommentCount(state, { payload }) {
      const { deletedCommentCount, postId } = payload;

      const i = state.posts.findIndex((post) => post._id === postId);
      deletedCommentCount
        ? (state.posts[i].commentsAmount -= deletedCommentCount + 1)
        : (state.posts[i].commentsAmount -= 1);
    },

    setActiveUserUpdatedCover(state, { payload }) {
      state.posts.map((post) => {
        post.author.profileImg = payload;
        if (
          post.authenticAuthor &&
          post.authenticAuthor._id === post.author._id
        )
          post.authenticAuthor.profileImg = payload;

        return post;
      });
    },

    // SECTION: ======= Post CRUD'S ======== //

    changePostAudience() {},

    setUpdatedPostAudience(state, { payload }) {
      const { params, data } = payload;

      const i = state.posts.findIndex((post) => post._id === params.postId);
      state.posts[i].audience = data.audience;
    },

    deletePost(state) {
      updateOperationalLoadingState({ state });
      state.results = state.results - 1;
    },

    setDeletedPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);

      if (state.results) state.results = state.results -= 1;

      updateOperationalLoadingState({ state, loading: false });
    },

    // --> trigger is called in portal reducer
    setUpdatedPost(state, { payload }) {
      const { params, data } = payload;
      const i = state.posts.findIndex((post) => post._id === params.postId);
      state.posts[i] = { ...state.posts[i], ...data };
    },

    reactOnPost() {},

    setPostReaction(state, { payload }) {
      const { postId, data } = payload;

      const post = state.posts.find((post) => post._id === postId);
      Object.keys(data).map((key) => (post[key] = data[key]));
    },

    // SECTION: ======= User Related ======== //

    getFeedPosts(state, { payload }) {
      if (payload.hasMore === false)
        updateLoadingState({ state, key: "loadingState" });
    },

    getProfilePosts(state, { payload }) {
      if (payload.hasMore === false)
        updateLoadingState({ state, key: "loadingState" });
    },

    // SECTION: ======= Bookmarks ======== //

    getBookmarks(state, { payload }) {
      if (payload.hasMore === false)
        updateLoadingState({ state, key: "loadingState" });
    },

    savePost() {},

    removeBookmark(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.results = state.results - 1;
    },

    setBookmarkedPosts(state, { payload }) {
      const { data, results } = payload;

      state.posts = [
        ...state.posts,
        ...data.map((bookmark) => {
          if (bookmark.deleted)
            return { _id: bookmark.cachedId, deleted: bookmark.deleted };
          else return bookmark.post;
        }),
      ];

      if (results) state.results = results;

      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    // SECTION: ======= Profile-Review ======== //

    getPendingPosts(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    getHiddenPosts(state) {
      updateLoadingState({ state, key: "loadingState" });
    },

    // --> used in profileReview on Tagged Posts
    showOnProfile() {},

    // --> used in profileReview on Hidden Posts
    addToProfile() {},

    setShowOnProfile(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },

    hideFromProfile() {},

    setHiddenPost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);

      if (state.results) state.results = state.results -= 1;
    },

    removeTag() {},

    setRemovedTag(state, { payload }) {
      const { data, remove } = payload;

      if (remove) {
        state.posts = state.posts.filter((post) => post._id !== data.postId);
        state.results = state.results -= 1;
      } else if (!remove) {
        const i = state.posts.findIndex((post) => post._id === data.postId);
        state.posts[i].tags = data.tags;
      }
    },

    // SECTION: ======= BlogPosts ======== //

    getBlogPosts(state, { payload }) {
      if (payload.hasMore === false)
        updateLoadingState({ state, key: "loadingState" });
    },

    getTopRatedPublishers(state) {
      updateLoadingState({ state, key: "publishersLoadingState" });
    },

    setTopRatedPublishers(state, { payload }) {
      state.topRatedPublishers = payload;

      updateLoadingState({
        state,
        key: "publishersLoadingState",
        loading: false,
      });
    },

    getTopRatedBlogPosts(state) {
      updateLoadingState({ state, key: "topRatedPostsLoadingState" });
    },

    setTopRatedBlogPosts(state, { payload }) {
      state.topRatedBlogPosts = payload;

      updateLoadingState({
        state,
        key: "topRatedPostsLoadingState",
        loading: false,
      });
    },

    getRelatedPosts(state) {
      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
      });
    },

    setRelatedPosts(state, { payload }) {
      state.relatedPosts = payload;

      updateLoadingState({
        state,
        key: "relatedPostsLoadingState",
        loading: false,
      });
    },

    setSliderBlogPosts(state) {
      const sliderPosts = [...state.posts]
        .filter(
          (blogPost) =>
            new Date(blogPost.createdAt).getTime() >
              Date.now() - 1000 * 60 * 60 * 24 * 7 && blogPost.media[0]
        )
        .sort(({ likesAmount: a }, { likesAmount: b }) => b - a)
        .slice(0, 3)
        .map((blogPost) => ({
          media: blogPost.media[0],
          title: blogPost.title,
          _id: blogPost._id,
        }));

      state.sliderBlogPosts = [...sliderPosts];
    },
  },
});

export default postsDataSlice.reducer;
export const {
  // SECTION-RELATED: ======= Error Setters And Reseters ======== //
  setErrorOnPostOperation,
  resetErrorOnPostOperation,
  setErrorOnLoadingState,
  resetErrorOnLoadingState,
  setErrorOnTopRatedPublishers,
  setErrorOnTopRatedBlogPosts,
  setErrorOnRelatedBlogPosts,
  resetPosts,
  // SECTION-RELATED: ======= Global Setters And Getters ======== //
  getPost,
  setPosts,
  setNewPost,
  setSinglePost,
  encreasePostCommentCount,
  decreasePostCommentCount,
  setActiveUserUpdatedCover,
  // SECTION-RELATED: ======= Post CRUD'S ======== //
  changePostAudience,
  setUpdatedPostAudience,
  deletePost,
  setDeletedPost,
  setUpdatedPost,
  reactOnPost,
  setPostReaction,
  // SECTION-RELATED: ======= User Related ======== //
  getProfilePosts,
  getFeedPosts,
  // SECTION-RELATED: ======= Bookmarks ======== //
  savePost,
  removeBookmark,
  setBookmarkedPosts,
  // SECTION-RELATED: ======= Profile-Review ======== //
  getPendingPosts,
  getHiddenPosts,
  getBookmarks,
  showOnProfile,
  addToProfile,
  setShowOnProfile,
  hideFromProfile,
  setHiddenPost,
  removeTag,
  setRemovedTag,
  // SECTION-RELATED: ======= BlogPosts ======== //
  getBlogPosts,
  getTopRatedPublishers,
  setTopRatedPublishers,
  getTopRatedBlogPosts,
  setTopRatedBlogPosts,
  getRelatedPosts,
  setRelatedPosts,
  setSliderBlogPosts,
} = postsDataSlice.actions;

function updateOperationalLoadingState({
  state,
  loading = true,
  error = false,
  message,
  task,
}) {
  state.operationalLoadingState.loading = loading;
  state.operationalLoadingState.error = error ? true : false;
  state.operationalLoadingState.message = error ? message : "";
  state.operationalLoadingState.task = error ? task : "";
}

function updateLoadingState({
  state,
  key,
  loading = true,
  error = false,
  message = "",
}) {
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
}
