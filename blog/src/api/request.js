import axios from "./axios.js"

let instance = axios({
  withCredentials: true
});

export default {
  get(url, params, headers) {
    let options = {};
    if (!params) {
      params = {};
    }
    if (params) {
      options.params = params;
    }
    if (headers) {
      options.headers = headers;
    }
    return instance.get(url, options);
  },
  post(url, query, headers) {
    let options = {};

    if (headers) {
      options.headers = headers;
    } else {
      options.headers = {};
    }
    return instance.post(url, query, options);
  }
};
