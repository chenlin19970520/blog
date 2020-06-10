<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    let userInfo = this.$func.getCookie("blogUserInfo");
    if (userInfo) {
      this.$store.dispatch("user/modifyUserInfo", userInfo);
    }
    let userInfoDetail = this.$func.getCookie("blogInfoDetail");
    if(userInfoDetail){
      this.$store.dispatch("user/modifyUserInfoDetail",userInfoDetail)
    }
  }
}
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: #efefef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /deep/ .el-loading-spinner {
    top: 0;
    margin-top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .circular {
      width: 32px;
      height: 32px;
      .path{
        stroke:rgba(9, 143, 167);
      }
    }
  }
}
/deep/.el-button--primary{
  background-color: #098FA4 !important;
  border-color: #098FA4 !important;
}
// /deep/.el-button--primary.is-disabled{
//   background-color: rgba(9, 143, 167,0.5) !important;
//   border-color: rgba(9, 143, 167,0.25) !important;
// }
.color-main{
  color:#098FA4;
}

.color-list {
  color: #f56c6c;
  color: #67c23a;
  color: #e6a23c;
  color: #909399;
  color: #409eff;
}
img {
  display: block;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
