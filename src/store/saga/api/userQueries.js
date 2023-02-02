import { axiosQuery } from "../../axiosConfig";

export async function queryUserProfile(userId) {
  return await axiosQuery(`/user/${userId}/profile`);
}

export async function queryUserSearch(key) {
  return await axiosQuery(`/user/search?key=${key}`);
}
