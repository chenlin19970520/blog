import axios from "axios";
let http = axios.create({
  timeout: 30000,
  withCredentials:false,
});

http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.request.use(
  config => {
    try {
    } catch (e) {}
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(response => {
  let { data, code, msg } = response.data;
  if (code == 200 || code == 204) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(msg);
  }
});

export default function() {
  return http;
}
