import axios from "axios";
import decode from "jwt-decode";
import { getAPI_EndPoint } from "../lib/config";

function getJWT() {
  return localStorage.getItem("academind_passport")
    ? JSON.parse(localStorage.getItem("academind_passport"))
    : null;
}

const refresher = axios.create({
  baseURL: `${getAPI_EndPoint()}/authentication/refresh`,
  withCredentials: true,
  method: "GET",
});

export const axioss = axios.create({
  baseURL: getAPI_EndPoint(),
  withCredentials: true,
});

export const axiosQuery = axios.create({
  baseURL: getAPI_EndPoint(),
  withCredentials: true,
});

export const axiosFormDataQuery = axios.create({
  baseURL: getAPI_EndPoint(),
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data",
  },
});

let refreshTokenPromise;

axiosQuery.interceptors.request.use(async (config) =>
  tokenExchange({ config })
);

axiosFormDataQuery.interceptors.request.use(async (config) =>
  tokenExchange({ config })
);

function tokenExchange({ config }) {
  const token = getJWT();

  const decodedUser = token && decode(token);
  const exp = decodedUser?.exp;

  if (Math.floor(Date.now() / 1000) > exp) {
    if (!refreshTokenPromise)
      refreshTokenPromise = refresher()
        .then(({ data }) => {
          refreshTokenPromise = null;
          return data.accessToken;
        })
        .catch((err) => {
          if (err.response.status === 401)
            localStorage.removeItem("academind_passport");
          refreshTokenPromise = null;
          return "";
        });

    return refreshTokenPromise.then((token) => {
      localStorage.setItem("academind_passport", JSON.stringify(token));
      config.headers.authorization = `Bearer ${token}`;
      return config;
    });
  } else {
    config.headers.authorization = `Bearer ${getJWT()}`;
  }

  return config;
}
