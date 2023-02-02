import { takeLatest } from "redux-saga/effects";

// SECTION: ========== 1.0) CREATE UPADATE SHARE ========== //
import { createPost, updatePost } from "../../reducers/createPostReducer";

import { sharePost } from "../../reducers/portalReducer";

import {
  // SECTION: ======= 2.0) User Related ======== //
  getProfilePosts,
  getFeedPosts,
  // SECTION: ======= 3.0) BlogPosts ======== //
  getBlogPosts,
  getTopRatedBlogPosts,
  getTopRatedPublishers,
  getRelatedPosts,
  // SECTION: ======= 4.0) Profile-Review ======== //
  showOnProfile,
  addToProfile,
  getPendingPosts,
  getHiddenPosts,
  hideFromProfile,
  removeTag,
  // SECTION: ======= 5.0) Bookmarks ======== //
  getBookmarks,
  savePost,
  // SECTION: ======= 6.0) Post CRUD'S ======== //
  changePostAudience,
  deletePost,
  reactOnPost,
  // SECTION: ======= 7.0) Global Setters And Getters ======== //
  getPost,
} from "../../reducers/postsDataReducer";

import {
  // SECTION-RELATED: ========== 1.0) CREATE UPADATE SHARE ========== //
  createPostHandler,
  sharePostHandler,
  updatePostHandler,
  // SECTION-RELATED: ======= 2.0) User Related ======== //
  getUserFeedHandler,
  getProfilePostsHandler,
  // SECTION-RELATED: ======= 3.0) BlogPosts ======== //
  getBlogPostsHandler,
  getTopRatedBlogPostsHandler,
  getTopRatedPublishersHandler,
  getRelatedPostsHandler,
  // SECTION-RELATED: ======= 4.0) Profile-Review ======== //
  getPendingPostsHandler,
  getHiddenPostsHandler,
  hidePostFromProfileHandler,
  showPostOnProfileHandler,
  addPostToProfileHandler,
  removeTagOnPostHandler,
  // SECTION-RELATED: ======= 5.0) Bookmarks ======== //
  getBookmarksHandler,
  savePostHandler,
  // SECTION-RELATED: ======= 6.0) Post CRUD'S ======== //
  deletePostHandler,
  changePostAudienceHandler,
  reactOnPostHandler,
  // SECTION-RELATED: ======= 7.0) Global Setters And Getters ======== //
  getPostHandler,
} from "../handlers/postsHandlers";

export default function* postsSaga() {
  // SECTION-SUB-RELATED: ========== 1.0) CREATE UPADATE SHARE ==========
  yield takeLatest(createPost, createPostHandler);
  yield takeLatest(sharePost, sharePostHandler);
  yield takeLatest(updatePost, updatePostHandler);
  // SECTION-SUB-RELATED: ======= 2.0) User Related ======== //
  yield takeLatest(getProfilePosts, getProfilePostsHandler);
  yield takeLatest(getFeedPosts, getUserFeedHandler);
  // SECTION-SUB-RELATED: ======= 3.0) BlogPosts ======== //
  yield takeLatest(getBlogPosts, getBlogPostsHandler);
  yield takeLatest(getTopRatedBlogPosts, getTopRatedBlogPostsHandler);
  yield takeLatest(getTopRatedPublishers, getTopRatedPublishersHandler);
  yield takeLatest(getRelatedPosts, getRelatedPostsHandler);
  // SECTION-SUB-RELATED: ======= 4.0) Profile-Review ======== //
  yield takeLatest(getPendingPosts, getPendingPostsHandler);
  yield takeLatest(getHiddenPosts, getHiddenPostsHandler);
  yield takeLatest(hideFromProfile, hidePostFromProfileHandler);
  yield takeLatest(showOnProfile, showPostOnProfileHandler);
  yield takeLatest(addToProfile, addPostToProfileHandler);
  yield takeLatest(removeTag, removeTagOnPostHandler);
  // SECTION-SUB-RELATED: ======= 5.0) Bookmarks ======== //
  yield takeLatest(getBookmarks, getBookmarksHandler);
  yield takeLatest(savePost, savePostHandler);
  // SECTION-SUB-RELATED: ======= 6.0) Post CRUD'S ======== //
  yield takeLatest(deletePost, deletePostHandler);
  yield takeLatest(changePostAudience, changePostAudienceHandler);
  yield takeLatest(reactOnPost, reactOnPostHandler);
  //SECTION-SUB-RELATED: ======= 7.0) Global Setters And Getters ======== //
  yield takeLatest(getPost, getPostHandler);
}
