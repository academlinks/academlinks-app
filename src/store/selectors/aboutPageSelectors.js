import { createSelector } from "@reduxjs/toolkit";

export const selectAboutPageState = ({ aboutUser }) => aboutUser.loadingState;

const selectedAboutUserData = ({ aboutUser }) => aboutUser.data;

export const selectAboutUserData = createSelector(
  selectedAboutUserData,
  (memorised) => memorised
);
