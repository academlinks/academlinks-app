import { createSlice } from "@reduxjs/toolkit";

const badgeSlice = createSlice({
  name: "badge",
  initialState: {
    requestCount: {
      count: 0,
      ids: [],
    },
    messageCount: {
      count: 0,
      ids: [],
    },
    notificationCount: {
      count: 0,
      ids: [],
    },
  },
  reducers: {
    getUnseenRequestsCount() {},

    setUnseenRequestsCount(state, { payload }) {
      state.requestCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetUnseenRequestsCount() {},

    setResetedRequestsCount(state) {
      state.requestCount = {
        count: 0,
        ids: [],
      };
    },

    encreaseUnseenRequestsCount(state, { payload }) {
      state.requestCount.count += payload;
    },

    getUnseenConversationsCount() {},

    setUnseenConversationsCount(state, { payload }) {
      state.messageCount = {
        count: payload.length,
        ids: payload,
      };
    },

    setMarkedConversation(state, { payload }) {
      const ids = state.messageCount.ids.filter(
        ({ _id }) => _id !== payload.conversationId
      );

      state.messageCount = {
        count: ids.length,
        ids: [...ids],
      };
    },

    resetUnseenConversationsCount() {},

    setResetedConversationsCount(state) {
      state.messageCount = {
        count: 0,
        ids: [],
      };
    },

    encreaseUnseenConversationsCount(state, { payload }) {
      if (
        !state.messageCount.ids.some(
          (con) => con._id === payload.message.conversation
        )
      )
        state.messageCount = {
          count: (state.messageCount.count += 1),
          ids: [
            ...state.messageCount.ids,
            { _id: payload.message.conversation },
          ],
        };
    },

    getUnseenNotificationsCount() {},

    setUnseenNotificationsCount(state, { payload }) {
      state.notificationCount = {
        count: payload.length,
        ids: payload,
      };
    },

    resetUnseenNotificationsCount() {},

    setResetedNotificationsCount(state) {
      state.notificationCount = {
        count: 0,
        ids: [],
      };
    },

    encreaseUnseenNotificationsCount(state, { payload }) {
      state.notificationCount.count += payload;
    },
  },
});

export default badgeSlice.reducer;
export const {
  getUnseenRequestsCount,
  setUnseenRequestsCount,
  resetUnseenRequestsCount,
  setResetedRequestsCount,
  encreaseUnseenRequestsCount,
  getUnseenConversationsCount,
  setUnseenConversationsCount,
  resetUnseenConversationsCount,
  setResetedConversationsCount,
  setMarkedConversation,
  encreaseUnseenConversationsCount,
  getUnseenNotificationsCount,
  setUnseenNotificationsCount,
  resetUnseenNotificationsCount,
  setResetedNotificationsCount,
  encreaseUnseenNotificationsCount,
} = badgeSlice.actions;
