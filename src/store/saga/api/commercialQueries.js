import { axiosQuery } from "../../axiosConfig";

export async function getCommercialsQuery(location) {
  return await axiosQuery(`/commercials?location=${location}`);
}
