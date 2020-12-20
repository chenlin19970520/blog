<template>
  <div class="header">
    <div class="header-body">
      <div class="body-left">
        <div class="logo">
          <img src="@/static/img/logo.jpg" alt="" />
        </div>
        <div class="header-menu">
          <div
            class="menu-item"
            @click="go(item.key)"
            v-for="(item, index) in menu"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="body-right">
        <div class="search">
          <el-input
            size="small"
            placeholder="搜索博客"
            suffix-icon="el-icon-search"
          ></el-input>
        </div>
        <div class="write">
          <el-button
            size="small"
            type="primary"
            @click="write"
            icon="el-icon-edit-outline"
            >写文章</el-button
          >
        </div>
        <div class="info" @click="openModal">
          <el-avatar
            size="medium"
            type="primary"
            :src="
              infoDetail && infoDetail.avatar
                ? infoDetail.avatar
                : require('@/static/img/avatar_male.png')
            "
          ></el-avatar>
          <div class="release-modal" @click="stopClick" v-if="releaseModal">
            <div
              class="menu-item"
              v-for="(item, index) in infoMenu"
              @click="jumpMenu(item.key)"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      releaseModal: false,
      menu: [
        {
          name: "首页",
          key: "/",
        },
        // {
        //   name: "文章",
        //   key: "",
        // },
        // {
        //   name: "导航",
        //   key: "",
        // },
      ],
      avatarUrl: "",
      infoMenu: [
        {
          name: "我的主页",
          key: "info",
        },
        {
          name: "退出登陆",
          key: "logout",
        },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    infoDetail() {
      return this.$store.state.user.infoDetail;
    },
  },
  mounted() {
    document.addEventListener("click", () => {
      this.closeModal();
    });
  },
  methods: {
    openModal(e) {
      this.stopClick(e);
      this.releaseModal = !this.releaseModal;
    },
    /**
     * @description:阻止点击事件
     */
    stopClick(e) {
      e.stopPropagation();
    },
    closeModal() {
      if (this.releaseModal) {
        this.releaseModal = false;
      }
    },
    /**
     * 跳转路径
     */
    jumpMenu(key) {
      switch (key) {
        case "info":
          this.goInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    /**
     * 退出登陆
     */
    logout() {
      this.$func.deleteCookie("blogUserInfo");
      this.$store.dispatch("user/modifyUserInfo", "");
      this.$router.replace("/login");
    },
    /**
     * @description:如果未登录去登陆。
     */
    goInfo() {
      if (this.userInfo && this.userInfo.id) {
        if (this.$func.checkRouter(this.$route, "/userCenter")) {
          return;
        }
        this.$router.push("/userCenter");
        return;
      }
      this.$router.push("/login");
    },
    go(key) {
      this.$router.push({
        path: key,
      });
    },
    /**
     * @description:去写博客
     */
    write() {
      this.$router.push("/write");
    },
  },
};
</script>

<style lang="less">
.header {
  background-color: white;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.03);
  .header-body {
    width: 972px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .body-left {
      display: flex;
      align-items: center;
      .logo {
        width: 100px;
        height: 60px;
        line-height: 60px;
        margin-right: 30px;
        img {
          width: 100%;
          height: auto;
          margin-top: 11px;
        }
      }
      .header-menu {
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;
        .menu-item {
          width: 90px;
          line-height: 60px;
          color: #999;
          &:hover {
            color: #007fff;
            cursor: pointer;
          }
        }
      }
    }
    .body-right {
      display: flex;
      align-items: center;
      .info {
        cursor: pointer;
        position: relative;
      }
      .search {
        margin-right: 20px;
      }
      .write {
        margin-right: 20px;
        /deep/ .el-button {
          background-color: #007fff;
        }
      }
    }
  }
}
.release-modal {
  position: absolute;
  top: 3rem;
  right: 0rem;
  width: 7rem;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1999;
  padding: 0.5rem 0;
  box-sizing: border-box;
  text-align: left;
  animation: showRelease 0.15s ease-in-out;
  border-radius: 4px;
  .menu-item {
    color: #666;
    font-size: 14px;
    box-sizing: border-box;
    text-align: center;
    padding: 0.5rem 1rem;
    &:hover {
      color: #098fa4;
    }
  }
}
</style>