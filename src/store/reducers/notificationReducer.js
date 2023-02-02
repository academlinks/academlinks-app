import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    loadingState: {
      loading: null,
      error: false,
      message: "",
      task: "", // could be "get" | "delete" | "deleteAll" | "mark" | "markAll"
    },

    notifications: [],
    activeNotifications: false,
  },
  reducers: {
    setNotificationError(state, { payload }) {
      updateNotificationState({
        state,
        loading: false,
        error: true,
        message: payload.message,
        task: payload.task,
      });
    },

    resetNotificationError(state) {
      updateNotificationState({ state, loading: false });
    },

    setActiveNotifications(state, { payload }) {
      state.activeNotifications = payload;
    },

    getNotifications(state) {
      updateNotificationState({ state });
    },

    setNotifications(state, { payload }) {
      state.notifications = payload;
      updateNotificationState({ state, loading: false });
    },

    deleteNotification(state) {
      if (state.loadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setDeletedNotification(state, { payload }) {
      state.notifications = state.notifications.filter(
        (notify) => notify._id !== payload
      );
    },

    deleteAllNotification(state) {
      if (state.loadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setDeleteAllNotifaction(state) {
      state.notifications = [];
    },

    markNotificationAsRead(state) {
      if (state.loadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setMarkedNotification(state, { payload }) {
      const i = state.notifications.findIndex(
        (notify) => notify._id === payload._id
      );
      state.notifications[i] = { ...state.notifications[i], ...payload };
    },

    markAllNotificationAsRead(state) {
      if (state.loadingState.error)
        updateNotificationState({ state, loading: false });
    },

    setAllNotificationAsRead(state) {
      state.notifications = state.notifications.map((notify) => ({
        ...notify,
        read: true,
      }));
    },
  },
});

export default notificationSlice.reducer;
export const {
  setNotificationError,
  resetNotificationError,
  setActiveNotifications,
  getNotifications,
  setNotifications,
  deleteNotification,
  setDeletedNotification,
  deleteAllNotification,
  setDeleteAllNotifaction,
  markNotificationAsRead,
  setMarkedNotification,
  markAllNotificationAsRead,
  setAllNotificationAsRead,
} = notificationSlice.actions;

function updateNotificationState({
  state,
  loading = true,
  error = false,
  message,
  task,
}) {
  state.loadingState.loading = loading;
  state.loadingState.error = error ? true : false;
  state.loadingState.message = error ? message : "";
  state.loadingState.task = error ? task : "";
}
