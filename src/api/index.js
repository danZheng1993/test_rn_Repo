/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import axios from "axios";

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
let cookies;
const defaultHeaders = {
  method: "get",
  crossDomain: true,
  headers: {
    "x-app-platform": "postman",
    "cache-control": "no-cache"
  }
};

export const setDefaultsForApi = async session => {
  if (session !== null) {
    cookies = JSON.parse(session);
    axios.defaults.headers.common.Authorization = `Bearer ${
      cookies.access_token
    }`;
  } else {
    cookies = { session_id: null, access_token: null };
    axios.defaults.headers.common.Authorization = `Bearer ${
      cookies.access_token
    }`;
  }
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

export const artistsFollow = Obj =>
  axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      "x-app-session": `${cookies.session_id}`
    },
    url: `/music/artists`,
    data: JSON.stringify(Obj)
  });

export function getMe(session) {
  const { access_token, session_id } = JSON.parse(session);
  return axios({
    ...defaultHeaders,
    method: "get",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      Authorization: `Bearer ${access_token}`,
      "x-app-session": session_id
    },
    url: `/users/me`,
    data: ""
  });
}

export function updateMe(Obj) {
  return axios({
    ...defaultHeaders,
    method: "post",
    headers: {
      ...defaultHeaders.headers,
      "x-app-date": getNewDate(),
      "Content-Type": "application/json",
      "x-app-device": device,
      "x-app-session": `${cookies.session_id}`
    },
    url: `/users/me`,
    data: JSON.stringify(Obj)
  });
}

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
