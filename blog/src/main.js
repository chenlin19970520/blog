import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import mavonEditor from "mavon-editor";
import hljs from "highlight.js"
import axios from "./api/request.js";
import filter from "./api/filter";
import filters from "./api/filters";
import func from "./api/function";
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/googlecode.css'  
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$filter = filter;
Vue.prototype.$func = func

// use v-highlight
// 自定义一个代码高亮指令
Vue.directive('highlight',function(el){
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    hljs.highlightBlock(block)
 })
})

Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

Vue.use(ElementUI);
Vue.use(mavonEditor) 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
