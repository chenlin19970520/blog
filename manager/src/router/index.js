import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/userInfo'
        },
        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path:"/administrator",
                    component:()=>import('../components/views/setting/admin.vue'),
                    meta:{title:"管理员管理",name:"系统设置"}
                },{
                    path:"/role",
                    component:()=>import("../components/views/setting/role.vue"),
                    meta:{title:"角色管理",name:"系统设置"}
                },{
                    path:"/authHistory",
                    component:()=>import("../components/views/user/history.vue"),
                    meta:{title:"用户管理",name:"审核历史"}
                },{
                    path:"/userAuth",
                    component:()=>import("../components/views/user/auth.vue"),
                    meta:{title:"用户管理",name:"用户审核"}
                },{
                    path:"/userInfo",
                    component:()=>import("../components/views/user/info.vue"),
                    meta:{title:"用户管理",name:"用户资料"}
                },{
                    path:"/articleList",
                    component:()=>import("../components/views/article/list.vue"),
                    meta:{title:"文章管理",name:"文章库"}
                },{
                    path:"/articleLabel",
                    component:()=>import("../components/views/article/label.vue"),
                    meta:{title:"文章管理",name:"文章标签"}
                },{
                    path:"/articleComment",
                    component:()=>import("../components/views/article/comment.vue"),
                    meta:{title:"文章管理",name:"评论"}
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/views/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
