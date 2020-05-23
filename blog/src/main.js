import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import mavonEditor from "mavon-editor";
import axios from "./api/request.js";
import filter from "./api/filter";
import func from "./api/function";
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$filter = filter;
Vue.prototype.$func = func


Vue.use(ElementUI);
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
