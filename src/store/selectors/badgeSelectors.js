import { createSelector } from "@reduxjs/toolkit";

export const selectRequestCount = ({ badges }) => badges.requestCount.count;

export const selectMessageCount = ({ badges }) => badges.messageCount.count;

export const selectNotificationCount = ({ badges }) =>
  badges.notificationCount.count;

const selectedAllBadgeCount = ({ badges }) => ({
  requestCount: badges.requestCount.count,
  messageCount: badges.messageCount.count,
  notificationCount: badges.notificationCount.count,
});

export const selectAllBadgeCount = createSelector(
  selectedAllBadgeCount,
  (memorised) => memorised
);
