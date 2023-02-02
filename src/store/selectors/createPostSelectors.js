import { createSelector } from "@reduxjs/toolkit";

export const selectCreatePostLoadingState = ({ createPost }) =>
  createPost.loadingState;

const selectedCreatePost = ({ createPost }) => ({
  createPostIsOpen: createPost.createPostIsOpen,
  updatePostModalIsOpen: createPost.updatePostModalIsOpen,
  createBlogPostIsOpen: createPost.createBlogPostIsOpen,
  updateBlogPostModalIsOpen: createPost.updateBlogPostModalIsOpen,
  postData: createPost.postData,
  createPostError: createPost.createPostError,
  createBlogPostError: createPost.createBlogPostError,
  loadingState: createPost.loadingState,
  // updatePostMediaFiles: createPost.updatePostMediaFiles,
  // activeSelectedMedia: createPost.activeSelectedMedia,
  // updatePostLoadingState: createPost.updatePostLoadingState,
});

export const selectCreatePost = createSelector(
  selectedCreatePost,
  (memorised) => memorised
);

export const selectActiveSelectedMedia = ({ createPost }) =>
  createPost.activeSelectedMedia;

export const selectCreatePostModalStatuses = ({ createPost }) => ({
  createPostIsOpen: createPost.createPostIsOpen,
  updatePostModalIsOpen: createPost.updatePostModalIsOpen,
  createBlogPostIsOpen: createPost.createBlogPostIsOpen,
  updateBlogPostModalIsOpen: createPost.updateBlogPostModalIsOpen,
});
