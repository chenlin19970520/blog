<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: rgba(244, 245, 245, 1);
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
