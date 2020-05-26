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
      options.headers.token = info?info.token:""
    }
    console.log(options)
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
      options.headers.token = info?info.token:""
    }
    return instance.post(url, query, options);
  }
};
