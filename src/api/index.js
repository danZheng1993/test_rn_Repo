/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import axios from "axios";
import { AsyncStorage } from "react-native";

const API = "https://devapi.joinsaga.com/api/v1";

/* const API =
  process.env.REACT_APP_ENV === "production"
    ? "https://api.zionxd.com/api/v1"
    : process.env.REACT_APP_ENV === "staging"
    ? "https://stagingapi.joinsaga.com/api/v1"
    : "https://devapi.joinsaga.com/api/v1"; */

/* const STRIPE_URL = "https://api.stripe.com/v1";
const STRIPE_KEY =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_STRIPE_KEY_PROD
    : process.env.REACT_APP_ENV === "staging"
    ? process.env.REACT_APP_STRIPE_KEY_STAGING
    : process.env.REACT_APP_STRIPE_KEY_DEV; */

axios.defaults.baseURL = API;
const device = "android";
const defaultHeaders = {
  method: "get",
  crossDomain: true,
  headers: {
    "x-app-platform": "postman",
    "cache-control": "no-cache"
  }
};

const getAuthHeaders = async () => {
  const session = await AsyncStorage.getItem("session");
  if (session !== null) {
    const { access_token, session_id } = JSON.parse(session);
    return {
      Authorization: `Bearer ${access_token}`,
      "x-app-session": session_id
    };
  }
  return { session_id: null, access_token: null };
};

const getNewDate = () => {
  let date = new Date().toString();
  const index = date.indexOf("(");
  date = date.slice(0, index);
  return date;
};

export function getOnboardingArtists(page, perPage) {
  return axios({
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate()
    },
    url: `/music/artists/onboarding?page=${page}&perPage=${perPage}`
  });
}

export function getRelatedArtists(id) {
  return axios({
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate()
    },
    url: `/music/artists/related?id=${id}`
  });
}

export const artistsFollow = async Obj => {
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/music/artists`,
    data: JSON.stringify(Obj)
  });
};

export const getMe = async () => {
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "get",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/users/me`,
    data: ""
  });
};

export const updateMe = async Obj => {
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/users/me`,
    data: JSON.stringify(Obj)
  });
};

export const userNameAvailability = username =>
  axios({
    ...defaultHeaders,
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate()
    },
    url: `/auth/availability/${username}`,
    data: ""
  });

export const emailAvailability = email =>
  axios({
    ...defaultHeaders,
    method: "get",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate()
    },
    url: `/auth/availability/email/${email}`,
    data: ""
  });

export function userRegistration(values) {
  let data;
  if (values.phone) {
    data = `first_name=${values.firstName}&last_name=${
      values.lastName
    }&username=${values.username}&password=${values.password}&phone=${
      values.phone
    }&country_code=${values.country_code}&email=${
      values.email
    }&device=${device}`;
  } else {
    data = `first_name=${values.firstName}&last_name=${
      values.lastName
    }&username=${values.username}&password=${values.password}&email=${
      values.email
    }&device=${device}`;
  }

  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "x-app-device": device
    },
    url: `/auth/register`,
    data
  });
}

export function sendVerificationCode(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/verify/send`,
    data: JSON.stringify(Obj)
  });
}

export function resendVerificationCode(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/verify/resend`,
    data: JSON.stringify(Obj)
  });
}

export function verifyCode(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/verify`,
    data: JSON.stringify(Obj)
  });
}

export function loginWithUsername(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/login`,
    data: JSON.stringify(Obj)
  });
}

export function loginWithEmail(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/login`,
    data: JSON.stringify(Obj)
  });
}

export function loginWithPhone(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device
    },
    url: `/auth/verify/login`,
    data: JSON.stringify(Obj)
  });
}

export const getSongs = async Obj => {
  const { type, page, perPage } = Obj;
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "get",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/music/songs/stolen?type=${type}&page=${page}&perPage=${perPage}`,
    data: ""
  });
};

export const getHistory = async Obj => {
  const { userId, page, perPage } = Obj;
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "get",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/users/songs/stolen?userId=${userId}&page=${page}&perPage=${perPage}`,
    data: ""
  });
};

export const stealSong = async songId => {
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/music/songs/steal?songId=${songId}`,
    data: ""
  });
};

export const earningToCoins = async earningId => {
  const authHeaders = await getAuthHeaders();
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      ...authHeaders
    },
    url: `/users/earnings?earningId=${earningId}`,
    data: ""
  });
};
