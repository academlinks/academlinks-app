import { axiosQuery } from "../../axiosConfig";

export async function querySendRequest(userId) {
  return await axiosQuery.post(`/user/${userId}/request`);
}

export async function queryCancelRequest(userId) {
  return await axiosQuery.patch(`/user/${userId}/cancel-request`);
}

export async function queryDeleteRequest(userId) {
  return await axiosQuery.delete(`/user/${userId}/cancel-request`);
}

export async function queryConfirmRequest(userId) {
  return await axiosQuery.patch(`/user/${userId}/request`);
}

export async function queryDeleteFriend(userId) {
  return await axiosQuery.delete(`/user/${userId}/friends`);
}

export async function queryGetAllFriends(userId) {
  return await axiosQuery(`/user/${userId}/friends`);
}

export async function queryGetPendingRequests(userId) {
  return await axiosQuery(`/user/${userId}/pending-requests`);
}

export async function queryGetSentRequests(userId) {
  return await axiosQuery(`/user/${userId}/sent-requests`);
}
