import { axiosQuery, axioss } from "store/axiosConfig";

export async function getCommercialsQuery(location) {
  return await axioss(`/commercials?location=${location}`);
}
