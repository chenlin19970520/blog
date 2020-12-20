const url = 'http://192.168.10.174:8005';
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
