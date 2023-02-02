import { createSelector } from "@reduxjs/toolkit";

// SECTION: LOADING STATES

export const selectActiveUserLoadingState = ({ activeUser }) =>
  activeUser.loadingState;

/* ============================================= */
/* =================== User =================== */
/* =========================================== */

export const selectActiveUserId = ({ activeUser }) => activeUser.user._id;

const selectedActiveUser = ({ activeUser }) => activeUser.user;

export const selectActiveUser = createSelector(
  selectedActiveUser,
  (memorised) => memorised
);

export const selectActiveUserShortInfo = ({ activeUser }) => ({
  userName: activeUser.user.userName,
  email: activeUser.user.email,
  image: activeUser.user.profileImg,
  _id: activeUser.user._id,
});

export const selectIsAuthenticated = ({ activeUser }) =>
  activeUser.user.isAuthenticated;
