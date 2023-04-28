import { axiosQuery } from "store/axiosConfig";

export async function queryUserAboutData(userId) {
  return await axiosQuery(`/about/${userId}`);
}
