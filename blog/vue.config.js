
let url = "http://192.168.10.174:8005";

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    port: 8088,
    disableHostCheck: true,
    proxy: {
      "/web": {
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
