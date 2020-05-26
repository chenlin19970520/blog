<template>
  <div class="user-center">
    <div class="header">
      <headerTop></headerTop>
    </div>
    <div class="list-box">
      <div class="center-box">
        <div class="center-left">
          <div class="user-info">
            <div class="info-content">
              <div>
                <img class="user-avatar" :src="userInfo.avatar" alt />
              </div>
              <div class>
                <div class="user-nickName">{{userInfo.nickname}}</div>
                <div>
                  <img
                    class="user-gender"
                    :src="require('@/static/img/'+(userInfo.gender=='MALE'?'male.png':'female.png'))"
                    alt
                  />
                </div>
                <div class="user-work-box">
                  <img src="@/static/img/work.png" class="user-work" alt />
                  <div class="user-work-text">前端工程师</div>
                </div>
              </div>
            </div>
            <div>
              <el-button type="primary">编辑个人资料</el-button>
            </div>
          </div>

          <div class="article-box">
            <el-tabs v-model="tabActive" @tab-click="handleClick">
              <el-tab-pane label="文章" name="article">
                <div class="article-list">

                </div>
              </el-tab-pane>
              <el-tab-pane label="动态" name="dynamic">用户管理</el-tab-pane>
              <el-tab-pane label="赞 0" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="评论 0" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="center-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";
export default {
  components: {
    headerTop
  },
  data(){
    return{
      tabActive:"article",


      pageNum:1,
      pageSize:20
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  created(){
    this.getArticleList()
  },
  methods:{
    /**
     * @description:获取文章列表
     * @author:chenlin
     * @time:2020-05-26
     */
    getArticleList(){
      let query = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
      }
      this.$axios.get("/web/user/article",query).then(
        (res)=>{
          console.log(res)
        }
      )
    },

    handleClick(tab, event){
      console.log(tab, event)
    }
  }
};
</script>

<style lang="less" scoped>

.user-center {
  background-color: #efefef;
}
.list-box {
  background-color: #efefef;
  padding-top: 1.25rem;
}
.center-box {
  max-width: 972px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .center-left {
    width: 75%;
    .user-info {
      background-color: white;
      border-radius: 3px;
      padding: 2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .info-content {
        display: flex;
        text-align: left;
        .user-nickName {
          font-weight: bold;
          font-size: 26px;
          color: black;
        }
        .user-gender {
          width: 16px;
          height: 16px;
          margin-top: 10px;
        }
        .user-work-box {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .user-work {
            width: 16px;
            height: 16px;
          }
          .user-work-text {
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }
      .user-avatar {
        width: 90px;
        height: 90px;
        display: block;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 2rem;
      }
    }
    .article-box {
      margin-top: 1.25rem;
      background-color: white;
      border-radius: 3px;
      .article-list{
        min-height: 300px;
      
      }
      /deep/.el-tabs__nav-wrap{
        .el-tabs__item{
          padding: .5rem 0rem;
          width: 7rem;
          height: auto;
        }
        &::after{
          height: 1px;
        }.el-tabs__item{
          font-size: 16px;
        }
        .el-tabs__item:hover,.el-tabs__item.is-active{
          color: #098FA4;
        }
        .el-tabs__active-bar{
          background-color:#098FA4;
        }
      }
    }
  }
  .center-right {
    width: 20%;
  }
}
</style>