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

const defaultHeaders = {
  method: "get",
  crossDomain: true,
  headers: {
    "x-app-platform": "postman",
    "cache-control": "no-cache"
  }
};

const getNewDate = () => {
  let date = new Date().toString();
  const index = date.indexOf("(");
  date = date.slice(0, index);
  return date;
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
      "x-app-device": "huaweip8"
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
      "x-app-device": "huaweip8"
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
      "x-app-device": "huaweip8"
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
      "x-app-device": "huaweip8"
    },
    url: `/auth/verify/login`,
    data: JSON.stringify(Obj)
  });
}
