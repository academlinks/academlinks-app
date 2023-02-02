import { createSelector } from "@reduxjs/toolkit";

// Loading States

export const selectConversationLoadingState = ({ conversation }) =>
  conversation.loadingState;

export const selectAllConversationLoadingState = ({ conversation }) =>
  conversation.getAllLoadingState;

export const selectConversationChatLoadingState = ({ conversation }) =>
  conversation.chatLoadingState;

///////////////////////////////////////////////////////

const selectedConversations = ({ conversation }) => ({
  allConversations: conversation.allConversations,
  allConversationState: conversation.getAllLoadingState,
});

export const selectAllConversations = createSelector(
  selectedConversations,
  (selectedData) => selectedData
);

const selectedActiveConversation = ({ conversation }) => ({
  conversation: conversation.activeConversation,
  conversationState: conversation.loadingState,
});

export const selectActiveConversation = createSelector(
  selectedActiveConversation,
  (con) => con
);

export const selectActiveConversationId = ({ conversation }) =>
  conversation.activeConversation._id;

export const selectConversationById = ({ conversation }, id) =>
  conversation.allConversations.find((conversation) => conversation._id === id);

export const selectNewConversationAlert = ({ conversation }) =>
  conversation.newConversationAlert;
