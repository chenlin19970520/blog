import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: '/',
    // baseURL : 'http://yn.xingnong365.cn',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {
            config.headers['token'] = sessionStorage.getItem('token');
        }
        return config;
    },
    error => {
    
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            if (response.status == 40000) {
                Message.error(response.msg);
            }
            Promise.reject();
        }
    },
    error => {
        return Promise.reject();
    }
);

export default service;
