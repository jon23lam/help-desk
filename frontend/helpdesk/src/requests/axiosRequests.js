import axios from "axios";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

export async function axiosGet(endpoint, params = {}) {
  const response = await axios.get(endpoint, {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
    },
  });

  return {
    headers: response.headers,
    data: response.data,
    status: response.status,
  };
}

export async function axiosPost(endpoint, payload, additionalHeaders = {}) {
  const response = await axios.post(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
      ...additionalHeaders,
    },
  });

  return response;
}

export async function axiosPatch(endpoint, payload, additionalHeaders = {}) {
  const response = await axios.patch(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
      ...additionalHeaders,
    },
  });

  return response;
}

export async function axiosPostNoAuth(
  endpoint,
  payload,
  additionalHeaders = {}
) {
  const response = await axios.post(endpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...additionalHeaders,
    },
  });

  return response;
}
