import { axiosQuery, axioss } from "../../axiosConfig";

export async function loginQuery(body) {
  return await axioss.post("/authentication/login", body);
}

export async function logOutQuery(body) {
  return await axiosQuery.post("/authentication/logout", body);
}

export async function checkRegistrationExistanceQuery({
  requestId,
  tokenId,
  body,
}) {
  return await axioss(
    `/authentication/confirm-register/${requestId}/confirm/${tokenId}`
  );
}

export async function sendRegistrationPasswordConfirmQuery({
  requestId,
  tokenId,
  body,
}) {
  return await axioss.post(
    `/authentication/confirm-register/${requestId}/confirm/${tokenId}`,
    body
  );
}

export async function sendRegistrationRequestQuery(body) {
  return await axioss.post("/authentication/register", body);
}

export async function sendForgotPasswordQuery(body) {
  return await axioss.post("/authentication/forgot-password", body);
}

export async function sendUpdateForgotPasswordQuery(body) {
  return await axioss.post("/authentication/forgot-password/update", body);
}

export async function deleteAccountQuery({ userId, data: body }) {
  return await axiosQuery.post(`/user/${userId}/delete-account`, body);
}
