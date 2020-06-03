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
  },{
    path:"/userCenter",
    name:"userCenter",
    component:()=>import("../views/user/info.vue")
  },{
    path:"/userEdit",
    name:"userEdit",
    component:()=>import("../views/user/editInfo.vue")
  },{
    path:"/articleDetail",
    name:"articleDetail",
    component:()=>import("../views/acticle/detail.vue")
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if(to.path=='/login' || to.path=="/"){
    next();
  }else{
    let user = func.getCookie("blogUserInfo");
    if(user.id){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
