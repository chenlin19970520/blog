<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in newRouter">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >
                                    {{
                                    threeItem.title
                                    }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'jurisdiction',
                    title: '系统设置',
                    subs: [
                        {
                            index: 'role',
                            title: '角色管理'
                        },
                        {
                            index: 'administrator',
                            title: '管理员管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-user',
                    index: 'userManage',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'userInfo',
                            title: '用户资料'
                        },
                        {
                            index: 'userAuth',
                            title: '用户审核'
                        },
                         {
                            index: 'authHistory',
                            title: '审核历史'
                        },
                    ]
                },
                {
                    icon: 'el-icon-reading',
                    index: 'article',
                    title: '文章管理',
                    subs: [
                        {
                            index: 'articleList',
                            title: '文章库'
                        },
                        {
                            index: 'articleLabel',
                            title: '文章标签'
                        },
                        {
                            index: 'articleComment',
                            title: '评论'
                        }
                    ]
                }
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'examine',
                //     title: '资质审核'
                // },
                // {
                //     icon: 'el-icon-reading',
                //     index: 'teacher',
                //     title: '教师管理'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: 'class',
                //     title: '课程管理'
                // },
                // {
                //     icon: 'el-icon-folder-opened',
                //     index: 'package',
                //     title: '套餐管理'
                // },
                // {
                //     icon: 'el-icon-chat-dot-round',
                //     index: '6',
                //     title: '问题管理',
                //     subs: [
                //         {
                //             index: 'question',
                //             title: '问题列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'teacherClient',
                //     title: '教师端',
                //     subs: [
                //         {
                //             index: 'teacherClientClass',
                //             title: '课程管理'
                //         },
                //         {
                //             index: 'teacherClientQuestion',
                //             title: '问题列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-document-copy',
                //     index: 'contactUsManagement',
                //     title: '联系我们'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'count',
                //     title: '数据统计',
                //     subs: [
                //         {
                //             index: 'orderManage',
                //             title: '订单管理'
                //         },
                //         {
                //             index: 'incomeCount',
                //             title: '收入统计'
                //         },
                //         {
                //             index: 'activeCount',
                //             title: '活跃统计'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-setting',
                //     index: 'system',
                //     title: '系统设置'
                // },
                // {
                //     icon: 'el-icon-folder-opened',
                //     index: 'materialLibrary',
                //     title: '素材库'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'commodity',
                //     title: '商品管理',
                // }
            ],
            newRouter: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    mounted() {
        let add = true;
        this.newRouter = this.items;
        // this.items.forEach(item => {
        //     roleRouter.forEach(cItem => {
        //         if (item.title === cItem.name) {
        //             this.newRouter.push(item);
        //         }
        //         if (cItem.name == '教师端') {
        //             add = false;
        //         }
        //     });
        // });
        return;
        if (add) {
            // this.newRouter.unshift({
            //     icon: 'el-icon-lx-home',
            //     index: 'dashboard',
            //     title: '系统首页'
            // });
        } else {
            this.$router.push('/teacherClientClass');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
