import { axiosQuery } from "../../axiosConfig";

export async function getUserInfoQuery(userId) {
  return await axiosQuery(`/about/${userId}`);
}

export async function addUserInfoQuery({ userId, body }) {
  return await axiosQuery.post(`/about/${userId}`, body);
}

export async function updateNestedUserInfoQuery({
  userId,
  field,
  docId,
  data,
}) {
  return await axiosQuery.patch(`/about/${userId}/${field}/${docId}`, data);
}

export async function deleteUserInfoQuery({ userId, field }) {
  return await axiosQuery.delete(`/about/${userId}/${field}`);
}

export async function deleteNestedUserInfoQuery({ userId, field, docId }) {
  return await axiosQuery.delete(`/about/${userId}/${field}/${docId}`);
}

export async function updatePasswordQuery({ userId, body }) {
  return await axiosQuery.post(`/authentication/update/pass/${userId}`, body);
}

export async function updateEmailQuery({ userId, body }) {
  return await axiosQuery.post(`/authentication/update/email/${userId}`, body);
}
