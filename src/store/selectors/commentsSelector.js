import { createSelector } from "@reduxjs/toolkit";

export const selectCommentsLoadingState = ({ commentsData }) =>
  commentsData.loadingState;

const selectedPostCommentsById = ({ commentsData }, ID) =>
  commentsData.comments.find((commentsBlock) => commentsBlock.postId === ID)
    ?.comments;

export const selectPostCommentsById = createSelector(
  selectedPostCommentsById,
  (selectedData) => selectedData
);
