
let url = "http://bolg.longpeng.dev.cq1080.com/";

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    port: 8088,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: url,
        ws: true,
        changeOrigin: true
      },
      "/other": {
        target: url,
        ws: true,
        changeOrigin: true
      },
      "^/image":{
        target:url,
        ws:true,
        changeOrigin:true
      }
    }
  }
};
