import { createSelector } from "@reduxjs/toolkit";

export const selectRequestError = ({ friends }) => friends.requestError;

// PageStates
const selectedPendingRequestsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  requestError: friends.requestError,
  pendingRequests: friends.pendingRequests,
  searchKey: friends.searchKey,
});

export const selectPendingRequestsPageState = createSelector(
  selectedPendingRequestsPageState,
  (memorised) => memorised
);

const selectedSentRequestsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  requestError: friends.requestError,
  sentRequests: friends.sentRequests,
  searchKey: friends.searchKey,
});

export const selectSentRequestsPageState = createSelector(
  selectedSentRequestsPageState,
  (memorised) => memorised
);

const selectedAllFriendsPageState = ({ friends }) => ({
  loadingState: friends.loadingState,
  requestError: friends.requestError,
  allFriends: friends.allFriends,
  searchKey: friends.searchKey,
});

export const selectAllFriendsPageState = createSelector(
  selectedAllFriendsPageState,
  (memorised) => memorised
);

export const selectSearchKey = ({ friends }) => friends.searchKey;
