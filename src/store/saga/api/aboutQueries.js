import { axiosQuery } from "../../axiosConfig";

export async function queryUserAboutData(userId) {
  return await axiosQuery(`/about/${userId}`);
}
