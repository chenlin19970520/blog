<template>
    <div class="header">
        <div class="header-body">
            <div class="body-left">
                <div class="logo">
                    <img src="@/static/img/logo.jpg" alt="">
                </div>
                <div class="header-menu">
                    <div class="menu-item" v-for="(item,index) in menu" :key="index">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="body-right">
                <div class="search">
                    <el-input  size="small" placeholder="搜索博客"  suffix-icon="el-icon-search"></el-input>
                </div>
                <div class="write">
                    <el-button size="small" type="primary" icon="el-icon-edit-outline">写文章</el-button>
                </div>
                <div class="info"  @click="goInfo" >
                    <el-avatar size="medium" type="primary" :src="userInfo&&userInfo.avatar?userInfo.avatar:require('@/static/img/avatar_male.png')"></el-avatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            menu:[
                {
                    name:"首页",
                    key:""
                },{
                    name:"文章",
                    key:""
                },{
                    name:"导航",
                    key:""
                }
            ],
            avatarUrl:""
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.user.userInfo
        }
    },
    methods:{
        /**
         * @description:如果未登录去登陆。
         */
        goInfo(){
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="less">
.header{
    background-color: white;
    box-shadow: 0 1px 0 0 rgba(0,0,0,0.03);
    .header-body{
        width: 972px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .body-left{
            display: flex;
            align-items: center;
            .logo{
                width: 100px;
                height: 60px;
                line-height: 60px;
                margin-right: 30px;
                img{
                    width: 100%;
                    height: auto;
                    margin-top: 11px;
                }
            }
            .header-menu{
                flex: 1;
                display: flex;
                align-items: center;
                height: 60px;
                .menu-item{
                    width: 90px;
                    line-height: 60px;
                    color: #999;
                    &:hover{
                        color: #007fff;
                        cursor: pointer;
                    }
                }
            }
        }
        .body-right{
            display: flex;
            align-items: center;
            .search{
                margin-right: 20px;
            }
            .write{
                margin-right: 20px;
                /deep/ .el-button{
                    background-color: #007fff;
                }
            }
        }
    }
}
</style>