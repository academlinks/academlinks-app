import { createSelector } from "@reduxjs/toolkit";

export const selectNotificationsLoadingState = ({ notifications }) =>
  notifications.loadingState;

const selectedNotifications = ({ notifications }) =>
  notifications.notifications;

export const selectNotifications = createSelector(
  selectedNotifications,
  (memorised) => memorised
);

export const selectIsActiveNotifications = ({ notifications }) =>
  notifications.activeNotifications;
