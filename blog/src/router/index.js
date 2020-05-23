import Vue from 'vue'
import VueRouter from 'vue-router'
import func from "../api/function"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import ("../views/home/home.vue")
  },
  {
    path:"/login",
    name:"login",
    component:()=>import("../views/login/login.vue")
  },{
    path:"/write",
    name:"write",
    component:()=>import("../views/write/markdown.vue")
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
   console.log(to)
   next();
})

export default router
