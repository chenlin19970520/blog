const url = 'http://bolg.longpeng.dev.cq1080.com/';
// const url = '';

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/manage': {
                target: url ,
                ws: true, // 是否启用websockets
                changOrigin: true, // 开启跨域
                // pathRewrite: {
                //     '^/manage': '/'
                // }
            },
            '/image': {
                target: url,
                ws: true, // 是否启用websockets
                changOrigin: true // 开启跨域
            },
        }
    },
    configureWebpack: {
        externals: {
            AMap: 'AMap'
        }
    }
};
