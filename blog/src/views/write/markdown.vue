<template>
  <div class="markdown" @click="closeModal">
    <div class="title">
      <el-input placeholder="输入文章标题..." v-model="articleTitle"></el-input>
      <div class="right-menu">
        <div class="home" @click="goHome">
          <span>首页</span>
        </div>
        <div class="release" @click="showReleaseModal">
          <span>{{ articleId ? "更新" : "发布" }}</span>
          <img class="down-img" src="@/static/img/down.png" alt />
        </div>
        <div class="avatar">
          <el-avatar
            size="medium"
            type="primary"
            :src="
              userInfo && userInfo.avatar
                ? userInfo.avatar
                : require('@/static/img/avatar_male.png')
            "
          ></el-avatar>
        </div>
      </div>
    </div>
    <div class="release-modal" @click="stopClick" v-if="releaseModal">
      <div class="release-title">发布文章</div>
      <div class="module">
        <div class="module-title">可见性</div>
        <div class="module-body">
          <el-switch
            v-model="articleVisible"
            active-color="#999"
            inactive-color="#098FA4"
          ></el-switch>
          <span
            class="switch-text"
            :style="{ color: articleVisible ? '' : '#098FA4' }"
            >{{ articleVisible ? "公开" : "私有" }}</span
          >
        </div>
      </div>
      <div class="module">
        <div class="module-title">标签</div>
        <div class="module-body">
          <el-input class="input-box" placeholder="添加一个标签"></el-input>
        </div>
      </div>
      <div class="module">
        <el-button
          class="release-btn"
          @click="release"
          v-loading="releaseStatus"
          >确定并发布</el-button
        >
      </div>
    </div>
    <div id="editor">
      <mavon-editor @change="getInput" v-model="articleValue"></mavon-editor>
    </div>
    <div class="stop-click-modal" v-if="releaseStatus"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleId: "", //文章id,编辑时有
      articleValue: "", //文章内容
      articleTitle: "", //文章标题
      articleValueHtml: "", //html文章内容
      articleVisible: true, //文章可见性，false，公开，true，私有
      releaseModal: false, //控制发布弹窗
      releaseStatus: false, //发布loading
    };
  },
  created() {
    let article = sessionStorage.getItem("blog_edit_article")
      ? JSON.parse(sessionStorage.getItem("blog_edit_article"))
      : "";
    console.log(JSON.parse(sessionStorage.getItem("blog_edit_article")));
    if (article) {
      this.articleTitle = article.title;
      this.articleValue = article.content;
      this.articleId = article.articleId;
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  destroyed() {
    sessionStorage.removeItem("blog_edit_article");
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    /**
     * @description：获取html
     */
    getInput(e, value) {
      this.articleValueHtml = value;
    },
    /**
     * @description:阻止点击事件
     */
    stopClick(e) {
      e.stopPropagation();
    },
    /**
     * @description:打开弹窗
     */
    showReleaseModal(e) {
      this.stopClick(e);
      this.releaseModal = !this.releaseModal;
    },
    closeModal() {
      if (this.releaseModal) {
        this.releaseModal = false;
      }
    },
    /**
     * @description:发布文章
     */
    release() {
      let query = {
        content: this.articleValueHtml,
        exclusive: !this.articleVisible,
        label: "", //
        presenceStatus: 1, //新建
        title: this.articleTitle,
        userId: this.userInfo.id,
      };
      if (!query.title) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入文章标题！"
        );
        return;
      }
      if (!query.content) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入文章内容！"
        );
        return;
      }
      this.releaseStatus = true;
      this.$axios
        .post("/web/user/article", query)
        .then((res) => {
          console.log(res);
          this.releaseStatus = false;
          this.$func.toast(this.$createElement, "success", "提示", "发布成功");
          this.$router.replace("/userCenter");
        })
        .catch((err) => {
          this.loginLoading = false;
          this.$func.toast(this.$createElement, "error", "错误", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes showRelease {
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.stop-click-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
.markdown {
  .release-modal {
    position: absolute;
    top: 4rem;
    right: 2rem;
    width: 22rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1999;
    padding: 1rem;
    box-sizing: border-box;
    text-align: left;
    animation: showRelease 0.15s ease-in-out;
    .release-title {
      font-size: 18px;
      font-weight: bold;
      color: rgba(146, 153, 154);
    }
    .module {
      margin-top: 1rem;
      .module-title {
        color: rgba(146, 153, 154);
      }
      .module-body {
        margin-top: 0.7rem;
        color: rgba(146, 153, 154);
        .switch-text {
          margin-left: 0.5rem;
        }
        /deep/.el-input__inner {
          border: none;
          padding: 0px;
        }
        .input-box {
          border-bottom: 1px solid #dcdfe6;
        }
      }
      /deep/.el-button {
        background-color: white;
        color: #098fa4;
        border-color: #098fa4;
      }
      .release-btn {
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .title {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    /deep/.el-input {
      flex: 1;
      font-size: 24px;
      font-weight: bold;
      .el-input__inner {
        color: black;
        border: none;
        outline: none;
      }
    }
    .right-menu {
      padding: 0 1rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .home {
        color: #098fa4;
        cursor: pointer;
        margin-right: 20px;
      }
      .release {
        display: flex;
        align-items: center;
        color: #098fa4;
        cursor: pointer;
        .down-img {
          width: 15px;
          margin-left: 15px;
          height: 15px;
        }
      }
      .avatar {
        width: 36px;
        height: 36px;
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }
  #editor {
    width: 100%;
    height: calc(100vh - 4rem);
    .v-note-wrapper {
      height: 100%;
    }
  }
}
</style>