import { takeLatest } from "redux-saga/effects";

import {
  getNotifications,
  deleteNotification,
  deleteAllNotification,
  markNotificationAsRead,
  markAllNotificationAsRead,
} from "../../reducers/notificationReducer";

import {
  getUserNotificationsHandler,
  deleteUserNotificationHandler,
  deleteAllUserNotificationHandler,
  markNotificationAsReadHandler,
  markAllNotificationAsReadHandler,
} from "../handlers/notificationHandlers";

export default function* notificationsSaga() {
  yield takeLatest(getNotifications, getUserNotificationsHandler);
  yield takeLatest(deleteNotification, deleteUserNotificationHandler);
  yield takeLatest(deleteAllNotification, deleteAllUserNotificationHandler);
  yield takeLatest(markNotificationAsRead, markNotificationAsReadHandler);
  yield takeLatest(markAllNotificationAsRead, markAllNotificationAsReadHandler);
}
