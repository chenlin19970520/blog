import Vue from 'vue';
import VLing from 'v-charts/lib/line.common';
import VHistogram from 'v-charts/lib/histogram.common';
import VeChart from 'v-charts/lib/chart.common';
// import VBmap from 'v-charts/lib/amap.common';
import App from './App.vue';
import router from './router';
// import request from './utils/request'
import axios from 'axios';
import { Message } from 'element-ui';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/css/zc.css';
import './components/common/directives';
import 'babel-polyfill';
import func from './utils/index.js'

Vue.config.productionTip = false;
Vue.component(VLing.name, VLing);
Vue.component(VHistogram.name, VHistogram);
Vue.component(VeChart.name, VeChart);
// Vue.component(VBmap.name, VBmap);
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

Vue.prototype.axios = axios;
Vue.prototype.func = func

axios.defaults.baseURL = '/';

axios.interceptors.request.use(
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

axios.interceptors.response.use(
    response => {
        console.log(response)
        if (response.data.code === 200) {
            return response.data;
        } else {
            Message.error(response.data.msg);
            if (response.data.code == 401) {
                router.replace('/login');
            }
            return Promise.reject(response.data || response);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    let _token = sessionStorage.getItem('token');
    let _role = sessionStorage.getItem('ms_username');

    document.title = `${to.meta.title} | 番薯叶博客后台管理系统`;
    next();
    // // const roleManagement = localStorage.getItem('ms_username');
    // if (_token == undefined && to.path !== '/login') {
    //     // Message.error('请先登录');
    //     next();
    //     return;
    //     next('/login');
    // } else if (to.path && to.path !== '/login') {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     const list = JSON.parse(sessionStorage.getItem('ms_username')).permissions;
    //     //如果没有匹配到，证明没有权限

    //     if (String(JSON.stringify(list)).indexOf(to.meta.name) === -1) {
    //         next();
    //         return;
    //         if (to.path !== 'login') {
    //             Message.error('非法操作，请停止你的行为。否则将进行封禁');
    //             sessionStorage.clear();
    //             next('/login');
    //         }
    //     } else {
    //         if (to.matched.length === 0) {
    //             from.path ? next({ name: from.path }) : next('/');
    //             Message.error('当前账号暂无权限，请联系管理员');
    //         } else {
    //             next();
    //         }
    //     }
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
