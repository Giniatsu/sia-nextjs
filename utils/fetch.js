import { BACKEND_BASE_URL } from "./constants";

const modifiedFetch = (url, ...params) => {
  if (url.startsWith('/')) return fetch(BACKEND_BASE_URL + url, ...params)
  else return fetch(url, ...params);
}

export default modifiedFetch