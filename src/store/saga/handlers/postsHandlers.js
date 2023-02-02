import { call, put, select } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  // SECTION: ======= Error Setters And Reseters ======== //
  setErrorOnPostOperation,
  setErrorOnLoadingState,
  setErrorOnTopRatedBlogPosts,
  setErrorOnTopRatedPublishers,
  setErrorOnRelatedBlogPosts,
  // SECTION: ======= Global Setters And Getters ======== //
  setPosts,
  setNewPost,
  setSinglePost,
  // SECTION: ======= Post CRUD'S ======== //
  setUpdatedPostAudience,
  setDeletedPost,
  setPostReaction,
  // SECTION: ========== CREATE UPADATE SHARE ========== //
  setUpdatedPost,
  // SECTION: ======= BlogPosts ======== //
  setTopRatedBlogPosts,
  setTopRatedPublishers,
  setRelatedPosts,
  // SECTION: ======= Profile-Review ======== //
  setHiddenPost,
  setShowOnProfile,
  setRemovedTag,
  // SECTION: ======= Bookmarks ======== //
  setBookmarkedPosts,
} from "../../reducers/postsDataReducer";

import {
  resetCreatePost,
  setCreatePostError,
} from "../../reducers/createPostReducer";

import {
  resetSharePostModal,
  setSharePostError,
} from "../../reducers/portalReducer";

import {
  // SECTION-RELATED: ========== 1.0) CREATE UPADATE SHARE ========== //
  queryCreatePost,
  querySharePost,
  queryUpdatePost,
  // SECTION-RELATED: ======= 2.0) User Related ======== //
  queryGetUserFeed,
  queryGetUserProfilePosts,
  // SECTION-RELATED: ======= 3.0) BlogPosts ======== //
  queryBlogPosts,
  queryTopRatedBlogPosts,
  queryTopRatedPublishers,
  queryRelatedPosts,
  // SECTION-RELATED: ======= 4.0) Profile-Review ======== //
  queryGetHiddenPosts,
  queryGetPendingPosts,
  queryShowPostOnProfile,
  queryAddPostToProfile,
  queryRemoveTagOnPost,
  queryHidePostFromProfile,
  // SECTION-RELATED: ======= 5.0) Bookmarks ======== //
  querySavePost,
  queryGetBookmarks,
  // SECTION-RELATED: ======= 6.0) Post CRUD'S ======== //
  queryDeletePost,
  queryChangePostAudience,
  queryPostReaction,
  // SECTION-RELATED: ======= 7.0) Global Setters And Getters ======== //
  queryGetPost,
} from "../api/postQueries";

import { allowNewPostSet, isRoute } from "../../../lib/window-location";

// SECTION-SUB-RELATED: ========== 1.0) CREATE UPADATE SHARE ==========

export function* createPostHandler({ payload: body }) {
  try {
    const { data } = yield call(queryCreatePost, body);
    yield put(setNewPost(data));
    yield put(resetCreatePost());
  } catch (error) {
    yield showError({
      error,
      location: "createPostHandler",
      setter: setCreatePostError,
      setterParams: {
        message: errorMessages.post.create,
      },
    });
  }
}

export function* updatePostHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryUpdatePost, {
      postId: params.postId,
      body,
    });
    yield put(setUpdatedPost({ params, data }));
    yield put(resetCreatePost());
  } catch (error) {
    yield showError({
      error,
      location: "updatePostHandler",
      setter: setCreatePostError,
      setterParams: {
        message: errorMessages.post.updatePost,
      },
    });
  }
}

export function* sharePostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(querySharePost, { postId, body });

    const activeUserId = yield select(({ activeUser }) => activeUser.user._id);
    if (allowNewPostSet(activeUserId)) yield put(setNewPost(data));

    yield put(resetSharePostModal());
  } catch (error) {
    yield showError({
      error,
      location: "sharePostHandler",
      setter: setSharePostError,
      setterParams: {
        message: errorMessages.post.sharePost,
      },
    });
  }
}

// SECTION-SUB-RELATED: ========== 2.0) User Related ==========
export function* getProfilePostsHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(
      queryGetUserProfilePosts,
      userID,
      page,
      limit,
      hasMore
    );
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({
      error,
      location: "getProfilePostsHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.post.load,
      },
    });
  }
}

export function* getUserFeedHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(queryGetUserFeed, userID, page, limit, hasMore);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({
      error,
      location: "getUserFeedHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

// SECTION-SUB-RELATED: ======= 3.0) BlogPosts ======== //

export function* getBlogPostsHandler({
  payload: { page, limit, hasMore, query },
}) {
  try {
    const { data } = yield call(queryBlogPosts, page, limit, hasMore, query);
    yield put(setPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({
      error,
      location: "getBlogPostsHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.post.load,
        task: "get",
      },
    });
  }
}

export function* getTopRatedPublishersHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedPublishers, limit);
    yield put(setTopRatedPublishers(data));
  } catch (error) {
    yield showError({
      error,
      location: "getTopRatedPublishersHandler",
      setter: setErrorOnTopRatedPublishers,
      setterParams: {
        message: errorMessages.post.load,
      },
    });
  }
}

export function* getTopRatedBlogPostsHandler({ payload: limit }) {
  try {
    const { data } = yield call(queryTopRatedBlogPosts, limit);
    yield put(setTopRatedBlogPosts(data));
  } catch (error) {
    yield showError({
      error,
      location: "getTopRatedBlogPostsHandler",
      setter: setErrorOnTopRatedBlogPosts,
      setterParams: { message: errorMessages.post.load },
    });
  }
}

export function* getRelatedPostsHandler({ payload: { postId, limit } }) {
  try {
    const { data } = yield call(queryRelatedPosts, postId, limit);
    yield put(setRelatedPosts(data));
  } catch (error) {
    yield showError({
      error,
      location: "getPostHandler",
      setter: setErrorOnRelatedBlogPosts,
      setterParams: {
        message: errorMessages.post.load,
      },
    });
  }
}

// SECTION-SUB-RELATED: ======= 4.0) Profile-Review ======== //

export function* getPendingPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetPendingPosts, userId);
    yield put(setPosts({ data }));
  } catch (error) {
    yield showError({
      error,
      location: "getPendingPostsHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* getHiddenPostsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryGetHiddenPosts, userId);
    yield put(setPosts({ data }));
  } catch (error) {
    yield showError({
      error,
      location: "getHiddenPostsHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* hidePostFromProfileHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    yield call(queryHidePostFromProfile, postId);
    if (excludeIf) yield put(setHiddenPost(postId));
  } catch (error) {
    yield showError({
      error,
      location: "hidePostFromProfileHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.hide,
        task: "hide",
      },
    });
  }
}

export function* removeTagOnPostHandler({ payload: postId }) {
  try {
    const excludeIf = isRoute("posts") || isRoute("tags") || isRoute("hidden");
    const { data } = yield call(queryRemoveTagOnPost, postId);
    yield put(setRemovedTag({ data, remove: excludeIf ? true : false }));
  } catch (error) {
    yield showError({
      error,
      location: "removeTagOnPostHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.operation,
        task: "removeTag",
      },
    });
  }
}

export function* showPostOnProfileHandler({ payload: { postId, body } }) {
  try {
    yield call(queryShowPostOnProfile, postId, body);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    yield showError({
      error,
      location: "showPostOnProfileHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.operation,
        task: "showOnProfile",
      },
    });
  }
}

export function* addPostToProfileHandler({ payload: postId }) {
  try {
    yield call(queryAddPostToProfile, postId);
    yield put(setShowOnProfile(postId));
  } catch (error) {
    yield showError({
      error,
      location: "addPostToProfileHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.addToProfile,
        task: "addToProfile",
      },
    });
  }
}

// SECTION-SUB-RELATED: ======= 5.0) Bookmarks ======== //

export function* getBookmarksHandler({
  payload: { id: userID, page, limit, hasMore },
}) {
  try {
    const { data } = yield call(
      queryGetBookmarks,
      userID,
      page,
      limit,
      hasMore
    );
    yield put(setBookmarkedPosts({ data: data.data, results: data.results }));
  } catch (error) {
    yield showError({
      error,
      location: "getBookmarksHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.user.load,
      },
    });
  }
}

export function* savePostHandler({ payload: postId }) {
  try {
    yield call(querySavePost, postId);
  } catch (error) {
    yield showError({
      error,
      location: "savePostHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.save,
        task: "save",
      },
    });
  }
}

// SECTION-SUB-RELATED: ======= 6.0) Post CRUD'S ======== //

export function* deletePostHandler({ payload: postId }) {
  try {
    yield call(queryDeletePost, postId);
    yield put(setDeletedPost(postId));
  } catch (error) {
    yield showError({
      error,
      location: "deletePostHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.deletion,
        task: "deletion",
      },
    });
  }
}

export function* changePostAudienceHandler({ payload: { params, body } }) {
  try {
    const { data } = yield call(queryChangePostAudience, {
      postId: params.postId,
      body,
    });
    yield put(setUpdatedPostAudience({ params, data }));
  } catch (error) {
    yield showError({
      error,
      location: "changePostAudienceHandler",
      setter: setErrorOnPostOperation,
      setterParams: {
        message: errorMessages.post.audience,
        task: "audience",
      },
    });
  }
}

export function* reactOnPostHandler({ payload: { postId, body } }) {
  try {
    const { data } = yield call(queryPostReaction, { postId, body });
    yield put(setPostReaction({ postId, data }));
  } catch (error) {
    yield showError({ error, location: "reactOnPostHandler" });
  }
}

// SECTION-SUB-RELATED: ======= 7.0) Global Setters And Getters ======== //

export function* getPostHandler({ payload: postId }) {
  try {
    const { data } = yield call(queryGetPost, postId);
    yield put(setSinglePost(data));
  } catch (error) {
    yield showError({
      error,
      location: "getPostHandler",
      setter: setErrorOnLoadingState,
      setterParams: {
        message: errorMessages.post.load,
        task: "get",
      },
    });
  }
}
