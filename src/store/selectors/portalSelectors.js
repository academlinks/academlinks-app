import { createSelector } from "@reduxjs/toolkit";

export const selectMediaModalIsOpen = ({ portal }) => portal.mediaModalIsOpen;

export const selectActiveMediaIndex = ({ portal }) => portal.activeMediaIndex;

export const selectMediaFiles = ({ portal }) => portal.mediaFiles;

export const selectUpdatePostModalIsOpen = ({ portal }) =>
  portal.updatePostModalIsOpen;

const selectedAllModalActiveStatus = ({ portal }) => ({
  mediaModalIsOpen: portal.mediaModalIsOpen,
  sharePostModalIsOpen: portal.sharePostModalIsOpen,
});

export const selectAllModalActiveStatus = createSelector(
  selectedAllModalActiveStatus,
  (memorised) => memorised
);

const selectedSharePostPortal = ({ portal }) => ({
  sharePostModalIsOpen: portal.sharePostModalIsOpen,
  sharePostData: portal.sharePostData,
  shareAudience: portal.shareAudience,
  sharePostLoadingState: portal.sharePostLoadingState,
});

export const selectSharePostPortal = createSelector(
  selectedSharePostPortal,
  (memorised) => memorised
);

const selectedUpdateBlogPostPortal = ({ portal }) => ({
  updateBlogPostModalIsOpen: portal.updateBlogPostModalIsOpen,
  updatePostData: portal.updatePostData,
  updatePostMediaFiles: portal.updatePostMediaFiles,
  updatePostLoadingState: portal.updatePostLoadingState,
  updateBlogPostError: portal.updateBlogPostError,
});

export const selectUpdateBlogPostPortal = createSelector(
  selectedUpdateBlogPostPortal,
  (memorised) => memorised
);

const selectedUpdatePostPortal = ({ portal }) => ({
  updatePostModalIsOpen: portal.updatePostModalIsOpen,
  updatePostData: portal.updatePostData,
  updatePostMediaFiles: portal.updatePostMediaFiles,
  updatePostLoadingState: portal.updatePostLoadingState,
  updatePostError: portal.updatePostError,
});

export const selectUpdatePostPortal = createSelector(
  selectedUpdatePostPortal,
  (memorised) => memorised
);
