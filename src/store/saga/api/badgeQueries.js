import { axiosQuery } from "../../axiosConfig";

export async function getUnseenRequestsCountQuery(userId) {
  return await axiosQuery(`/user/${userId}/pending-requests/count`);
}

export async function markRequestsAsSeenQuery(userId) {
  return await axiosQuery.patch(`/user/${userId}/pending-requests/count`);
}

export async function getUnseenConversationsCountQuery(userId) {
  return await axiosQuery(`/conversation/${userId}/unseen`);
}

export async function markConversationsAsSeenQuery(userId) {
  return await axiosQuery.patch(`/conversation/${userId}/unseen`);
}

export async function getNotificationCountQuery(userId) {
  return await axiosQuery(`/notifications/${userId}/unseen`);
}

export async function markNotificationsAsSeenQuery(userId) {
  return await axiosQuery.patch(`/notifications/${userId}/unseen`);
}
