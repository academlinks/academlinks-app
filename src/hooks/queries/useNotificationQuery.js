import { useDispatch } from "react-redux";

import {
  resetNotificationError,
  markAllNotificationAsRead,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotification,
  getNotifications,
} from "../../store/reducers/notificationReducer";

function useNotificationQuery() {
  const dispatch = useDispatch();

  function markAllNotificationAsReadQuery() {
    dispatch(markAllNotificationAsRead());
  }

  function markNotificationAsReadQuery(notificationId) {
    dispatch(markNotificationAsRead(notificationId));
  }

  function deleteNotificationQuery(notificationId) {
    dispatch(deleteNotification(notificationId));
  }

  function deleteAllNotificationQuery() {
    dispatch(deleteAllNotification());
  }

  function getNotificationsQuery(userId) {
    dispatch(getNotifications(userId));
  }

  function handleResetNotificationError() {
    dispatch(resetNotificationError());
  }

  return {
    handleResetNotificationError,
    markAllNotificationAsReadQuery,
    markNotificationAsReadQuery,
    deleteAllNotificationQuery,
    deleteNotificationQuery,
    getNotificationsQuery,
  };
}

export default useNotificationQuery;
