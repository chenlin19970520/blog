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
              <el-button type="primary" @click="editUserInfo">编辑个人资料</el-button>
            </div>
          </div>

          <div class="article-box">
            <el-tabs v-model="tabActive" @tab-click="handleClick">
              <el-tab-pane :label="'文章 '+articleList.length" name="article">
                <div class="article-list">
                  <div class="article-item" v-for="(item,index) in articleList" :key="index">
                    <div class="item-info">
                      <img class="avatar" :src="userInfo.avatar" alt />
                      <span class="name">{{userInfo.nickname}}</span>
                      <span class="pointer"></span>
                      <span>{{userInfo.createTime | dateTime}}</span>
                    </div>
                    <div class="item-title" @click="lookItem(item)">{{item.title}}</div>
                    <div class="item-more">
                      <div class="more-read">阅读&nbsp;{{item.reading?item.reading:0}}</div>
                      <el-dropdown trigger="click" @command="handleCommand($event,item)">
                        <div class="more-opeat">
                          <img class="opeat-img" src="@/static/img/more.png" alt />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="edit">编辑</el-dropdown-item>
                          <el-dropdown-item command="delete">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div
                  class="article-more"
                  v-if="articleList&&articleList.length"
                  v-loading="moreLoading"
                  @click="getMore"
                >查看更多</div>
              </el-tab-pane>
              <el-tab-pane label="动态" name="dynamic">无</el-tab-pane>
              <el-tab-pane label="赞 0" name="third">无</el-tab-pane>
              <el-tab-pane label="评论 0" name="fourth">无</el-tab-pane>
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
  data() {
    return {
      tabActive: "article",

      pageNum: 0,
      pageSize: 20,
      articleList: [],
      moreLoading: false //查看更多。
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  created() {
    this.getArticleList();
    this.getUserInfo();
  },
  methods: {
    /**
     * @description:查看文章详情
     */
    lookItem(item) {
      // sessionStorage.setItem("blog_article_detail", JSON.stringify(item));
      let routeUrl = this.$router.resolve({
        path: "/articleDetail",
        query:{
          id: item.articleId
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    /**
     * @description:获取个人信息
     */
    getUserInfo() {
      this.$axios.get("/web/user/user").then(res => {
        this.$func.setCookie("blogInfoDetail", res);
        this.$store.dispatch("user/modifyUserInfoDetail", res);
      });
    },
    /**
     * @description:去编辑该文章
     * @author:chenlin
     */
    editArticle(item) {
      sessionStorage.setItem("blog_edit_article", JSON.stringify(item));
      this.$router.push("/write");
    },
    /**
     * @description:删除该文章
     * @author:chenlin
     */
    deleteArticel(item) {
      let _this = this;
      this.$confirm("此操作将删除该文章且不可恢复,是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel-btn-primary",
        confirmButtonClass: "confirm-btn-primary",
        type: "warning"
      })
        .then(() => {
          let query = {
            ids: item.articleId
          };
          _this.$axios.delete("/web/user/article", query).then(res => {
            _this.$func.toast(
              _this.$createElement,
              "success",
              "提示",
              "删除成功！"
            );
            _this.getArticleList();
          });
        })
        .catch();
    },
    /**
     * @description:菜单操作
     * @author:chenlin
     */
    handleCommand(command, item) {
      if (command == "delete") {
        this.deleteArticel(item);
      } else if (command == "edit") {
        this.editArticle(item);
      }
    },
    /**
     * @description:获取文章列表
     * @author:chenlin
     * @time:2020-05-26
     */
    getArticleList(pageNum) {
      let query = {
        pageNum: pageNum ? pageNum : this.pageNum,
        pageSize: this.pageSize
      };
      this.$axios.get("/web/user/article", query).then(res => {
        if (res && res.content && res.content.length) {
          this.pageNum = pageNum ? pageNum : this.pageNum;
        } else if (pageNum) {
          this.$func.toast(
            this.$createElement,
            "warning",
            "警告",
            "没有更多数据了"
          );
        }
        this.moreLoading = false;
        this.articleList = this.articleList.concat(res.content);
      });
    },
    /**
     * @description:获取下一页文章列表
     */
    getMore() {
      this.moreLoading = true;
      this.getArticleList(this.pageNum + 1);
    },
    /**
     * @description:去编辑个人资料
     * @author:chenlin
     */
    editUserInfo() {
      this.$router.push("/userEdit");
    },
    handleClick(tab, event) {}
  }
};
</script>

<style lang="less" scoped>
/deep/.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(9, 143, 164, 0.25);
  color: #098fa4;
}

/deep/.el-button--primary:focus,
.el-button--primary:hover {
}
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
      .article-more {
        color: #666;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
      }
      .article-list {
        min-height: 300px;

        .article-item {
          padding: 2rem;
          border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
          .item-title {
            color: #666;
            font-size: 26px;
            font-weight: bold;
            text-align: left;
            margin-top: 1rem;
            cursor: pointer;
          }
          .item-more {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;
            .more-read {
              font-size: 12px;
              color: #bfbfbf;
              margin-right: 1rem;
            }
            .more-opeat {
              cursor: pointer;
              .opeat-img {
                width: 20px;
              }
            }
          }
          .item-info {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #999;
          }
          .pointer {
            width: 2px;
            height: 2px;
            display: block;
            border-radius: 50%;
            background-color: #999;
            margin-right: 10px;
          }
          .avatar {
            width: 35px;
            height: 35px;
            display: block;
            object-fit: cover;
            border-radius: 100%;
            margin-right: 10px;
          }
          .name {
            margin-right: 10px;
          }
        }
      }
      /deep/.el-tabs__nav-wrap {
        .el-tabs__item {
          padding: 0.5rem 0rem;
          width: 7rem;
          height: auto;
        }
        &::after {
          height: 1px;
        }
        .el-tabs__item {
          font-size: 16px;
        }
        .el-tabs__item:hover,
        .el-tabs__item.is-active {
          color: #098fa4;
        }
        .el-tabs__active-bar {
          background-color: #098fa4;
        }
      }
    }
  }
  .center-right {
    width: 20%;
  }
}
</style>