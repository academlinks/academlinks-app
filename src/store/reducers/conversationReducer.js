import { createSlice } from "@reduxjs/toolkit";

function updateLoadingState({
  state,
  key,
  loading,
  message,
  error = false,
  task,
}) {
  if (task) state[key].task = error ? task : "";
  state[key].loading = loading;
  state[key].error = error ? true : false;
  state[key].message = error ? message : "";
}

function resetLoadingState({ state, key, loading = false, task }) {
  if (task) state[key].task = "";
  state[key].loading = loading;
  state[key].error = false;
  state[key].message = "";
}

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    loadingState: {
      loading: false,
      error: false,
      message: "",
    },
    getAllLoadingState: {
      loading: false,
      error: false,
      message: "",
    },
    chatLoadingState: {
      loading: false,
      error: false,
      message: "",
      task: "", // "send" | "deletion" | "mark"
    },
    newConversationAlert: {
      isNew: false,
      id: "",
    },
    allConversations: [],
    activeConversation: null,
  },
  reducers: {
    setConversationError(state, { payload }) {
      updateLoadingState({
        state,
        key: payload.key,
        loading: false,
        message: payload.message,
        error: true,
        task: payload.task,
      });
    },

    resetConversationChatError(state) {
      resetLoadingState({
        key: "chatLoadingState",
        state,
        task: true,
      });
    },

    getAllConversations(state) {
      resetLoadingState({ state, key: "getAllLoadingState", loading: true });
    },

    setAllConversations(state, { payload }) {
      state.allConversations = payload;
      updateLoadingState({ state, key: "getAllLoadingState", loading: false });
    },

    getLastConversation(state) {
      resetLoadingState({ state, key: "loadingState", loading: true });
    },

    getConversation(state) {
      resetLoadingState({ state, key: "loadingState", loading: true });
    },

    setActiveConversation(state, { payload }) {
      state.activeConversation = payload;

      updateLoadingState({ state, key: "loadingState", loading: false });
    },

    getNewConversation() {},

    setNewConversation(state, { payload }) {
      if (!state.allConversations.some((conv) => conv._id === payload._id))
        state.allConversations.unshift(payload);

      state.newConversationAlert = {
        id: "",
        isNew: false,
      };
    },

    sendMessage(state) {
      if (state.chatLoadingState.error)
        resetLoadingState({
          state,
          key: "chatLoadingState",
          task: true,
        });
    },

    setNewMessage(state, { payload }) {
      const { message, lastMessage } = payload;

      const conversationInScope = state.allConversations.find(
        (conversation) => conversation._id === message.conversation
      );

      if (conversationInScope) {
        conversationInScope.messages.push(message);
        conversationInScope.lastMessage = lastMessage;
      }

      if (state.activeConversation?._id === message.conversation) {
        state.activeConversation.messages.push(message);
        state.activeConversation.lastMessage = lastMessage;
      }

      if (
        !conversationInScope &&
        state.activeConversation?._id !== message.conversation
      ) {
        state.newConversationAlert = {
          id: message.conversation,
          isNew: true,
        };
      }
    },

    deleteConversation(state) {
      if (state.chatLoadingState.error)
        resetLoadingState({
          state,
          key: "chatLoadingState",
          task: true,
        });
    },

    setDeletedConversation(state, { payload }) {
      state.activeConversation = null;

      state.allConversations = state.allConversations.filter(
        (conv) => conv?._id !== payload
      );
    },

    markAsRead(state) {
      if (state.chatLoadingState.error)
        resetLoadingState({
          state,
          key: "chatLoadingState",
          task: true,
        });
    },

    setMarkAsRead(state, { payload }) {
      const { conversationId, body } = payload;

      if (state.activeConversation?._id === conversationId) {
        state.activeConversation.lastMessage = body;
      }

      state.allConversations.find(
        (conv) => conv._id === conversationId
      ).lastMessage = body;
    },

    resetConversation(state) {
      state.activeConversation = null;
      state.allConversations = [];
    },
  },
});

export default conversationSlice.reducer;
export const {
  setConversationError,
  resetConversationChatError,
  getAllConversations,
  setAllConversations,
  getLastConversation,
  getConversation,
  setActiveConversation,
  getNewConversation,
  setNewConversation,
  sendMessage,
  setNewMessage,
  markAsRead,
  setMarkAsRead,
  deleteConversation,
  setDeletedConversation,
  resetConversation,
} = conversationSlice.actions;
