import { call, put } from "redux-saga/effects";
import { showError, errorMessages } from "./errorHandler";

import {
  setNotificationError,
  setNotifications,
  setDeletedNotification,
  setDeleteAllNotifaction,
  setMarkedNotification,
  setAllNotificationAsRead,
} from "../../reducers/notificationReducer";

import {
  queryUserNotifications,
  queryDeleteUserNotification,
  queryMarkNotificationAsRead,
  queryMarkAllNotificationAsRead,
  queryDeleteAllUserNotification,
} from "../api/notificationQueries";

export function* getUserNotificationsHandler({ payload: userId }) {
  try {
    const { data } = yield call(queryUserNotifications, userId);
    yield put(setNotifications(data));
  } catch (error) {
    yield showError({
      error,
      location: "getUserNotificationsHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.load,
        task: "get",
      },
    });
  }
}

export function* deleteUserNotificationHandler({ payload: notifyId }) {
  try {
    yield call(queryDeleteUserNotification, notifyId);
    yield put(setDeletedNotification(notifyId));
  } catch (error) {
    yield showError({
      error,
      location: "deleteUserNotificationHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.delete,
        task: "delete",
      },
    });
  }
}

export function* deleteAllUserNotificationHandler() {
  try {
    yield call(queryDeleteAllUserNotification);
    yield put(setDeleteAllNotifaction());
  } catch (error) {
    yield showError({
      error,
      location: "deleteAllUserNotificationHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.deleteAll,
        task: "deleteAll",
      },
    });
  }
}

export function* markNotificationAsReadHandler({ payload: notifyId }) {
  try {
    const { data } = yield call(queryMarkNotificationAsRead, notifyId);
    yield put(setMarkedNotification(data));
  } catch (error) {
    yield showError({
      error,
      location: "markNotificationAsReadHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.mark,
        task: "mark",
      },
    });
  }
}

export function* markAllNotificationAsReadHandler(payload) {
  try {
    yield call(queryMarkAllNotificationAsRead);
    yield put(setAllNotificationAsRead());
  } catch (error) {
    yield showError({
      error,
      location: "markAllNotificationAsReadHandler",
      setter: setNotificationError,
      setterParams: {
        message: errorMessages.notifications.markAll,
        task: "markAll",
      },
    });
  }
}
