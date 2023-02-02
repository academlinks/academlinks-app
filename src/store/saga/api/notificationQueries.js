import { axiosQuery } from "../../axiosConfig";

export async function queryUserNotifications(userId) {
  return await axiosQuery(`/notifications/${userId}`);
}

export async function queryDeleteUserNotification(notifyId) {
  return await axiosQuery.delete(`/notifications/notify/${notifyId}`);
}

export async function queryDeleteAllUserNotification() {
  return await axiosQuery.delete(`/notifications`);
}

export async function queryMarkNotificationAsRead(notifyId) {
  return await axiosQuery.patch(`/notifications/notify/${notifyId}`);
}

export async function queryMarkAllNotificationAsRead() {
  return await axiosQuery.patch(`/notifications`);
}
