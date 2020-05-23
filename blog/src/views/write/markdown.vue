<template>
    <div class="markdown">
        <div class="title">
            <el-input placeholder="输入文章标题..." v-model="articleTitle"></el-input>
            <div class="right-menu">
                <div class="release">
                    <span>发布</span>
                    <img class="down-img" src="@/static/img/down.png" alt="">
                </div>
                <div class="avatar">
                    <el-avatar size="medium" type="primary" :src="userInfo&&userInfo.avatar?userInfo.avatar:require('@/static/img/avatar_male.png')"></el-avatar>
                </div>
            </div>
        </div>
        <div id="editor" >
            <mavon-editor @change="getInput" v-model="articleValue"></mavon-editor>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            articleValue:"",//文章内容
            articleTitle:"",//文章标题
        }
    },
    created(){

    },
    computed:{
        userInfo(){
            return this.$store.state.user.userInfo;
        }
    },
    methods:{
        /**
         * @description：获取html
         */
        getInput(e,value){
            console.log(e,value)
        }
    }
}
</script>

<style lang="less" scoped>
.markdown{
    .title{
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /deep/.el-input{
            flex: 1;
            font-size: 24px;
            font-weight: bold;
            .el-input__inner{
            color: black;
            border: none;
            outline: none;
            }
        }
        .right-menu{
            padding: 0 1rem;
            box-sizing: border-box;
             display: flex;
            align-items: center;
            .release{
                display: flex;
                align-items: center;
                color: #098FA4 ;
                cursor: pointer;
                .down-img{
                    width: 15px;
                    margin-left: 15px;
                    height: 15px;
                    
                }
            }
            .avatar{
                width: 36px;
                height: 36px;
                margin-left: 30px;
                cursor: pointer;
            }
        }

    }
    #editor{
        width: 100%;
        height: calc(100vh - 4rem);
        .v-note-wrapper{
            height: 100%;
        }
    }
}
</style>