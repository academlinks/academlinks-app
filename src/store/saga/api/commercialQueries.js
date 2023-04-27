import { axiosQuery, axioss } from "../../axiosConfig";

export async function getCommercialsQuery(location) {
  return await axioss(`/commercials?location=${location}`);
}
