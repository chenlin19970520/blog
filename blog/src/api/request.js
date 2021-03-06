import axios from "./axios.js"
import global from "./function"
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
    }else{
      options.headers = {};
    }
    if(!options.headers.token){
      let info = global.getCookie('blogUserInfo');
      options.headers.appToken = info?info.token:""
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
    if(!options.headers.token){
      let info = global.getCookie('blogUserInfo');
      options.headers.appToken = info?info.token:""
    }
    return instance.post(url, query, options);
  },
  delete(url, query, headers) {
    let options = {};

    if (headers) {
      options.headers = headers;
    } else {
      options.headers = {};
    }
    if(!options.headers.token){
      let info = global.getCookie('blogUserInfo');
      options.headers.appToken = info?info.token:""
    }
    options.params = query;
    return instance.delete(url, options);
  },
};
