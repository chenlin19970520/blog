<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统首页
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="home-img">
                <img :src="require('@/assets/img/logo.png')" alt />
            </div>-->
            <div class="home-show">
                <div class="show-top">
                    <div class="show-item">
                        <div class="item-number">{{info.courseNumber}}</div>
                        <div class="item-name">课程数量</div>
                    </div>
                    <div class="show-item">
                        <div class="item-number">{{info.teacherNumber}}</div>
                        <div class="item-name">教师数量</div>
                    </div>
                    <div class="show-item">
                        <div class="item-number">{{info.userPCOnlineNumber}}</div>
                        <div class="item-name">PC端在线用户数量</div>
                    </div>
                    <div class="show-item">
                        <div class="item-number">{{info.userNumber}}</div>
                        <div class="item-name">用户总数</div>
                    </div>
                    <div class="show-item">
                        <div class="item-number">{{info.dailyIncome}}</div>
                        <div class="item-name">今日收入</div>
                    </div>
                    <div class="show-item">
                        <div class="item-number">{{info.totalIncome}}</div>
                        <div class="item-name">总收入</div>
                    </div>
                </div>
                <div class="show-entrance">
                    <div
                        class="entrance-item"
                        @click="goEntrance(item.url,item.auth)"
                        v-for="(item,index) in entrances"
                        :key="index"
                    >{{item.name}}</div>
                </div>
            </div>

            <div class="home-map">
                <div id="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
import AMap from 'AMap';
export default {
    data() {
        return {
            info: '', //数据
            entrances: [
                {
                    name: '课程管理',
                    url: '/class',
                    auth: '课程管理'
                },
                {
                    name: '套餐管理',
                    url: '/package',
                    auth: '套餐管理'
                },
                {
                    name: '教师管理',
                    url: '/teacher',
                    auth: '教师管理'
                },
                {
                    name: '用户管理',
                    url: '/userManage',
                    auth: '用户管理'
                },
                {
                    name: '问题管理',
                    url: '/question',
                    auth: '问题管理'
                },
                {
                    name: '收入统计',
                    url: '/incomeCount',
                    auth: '数据统计'
                }
            ]
        };
    },
    created() {
        this.getInfo();
    },
    mounted() {},
    methods: {
        /**
         * @Description:获取数据
         * @Author:chen
         * @Date:2019-12-12
         */
        getInfo() {
            this.axios.get('/manager/dashboard/home').then(res => {
                this.info = res.data;
                this.$nextTick(() => {
                    this.createMap(res.data.userHomeDtos);
                });
            });
        },

        /**
         * @Description:快捷入口跳转
         * @Author:chen
         * @Date:2019-12-13
         */
        goEntrance(url, auth) {
            let userAuth = JSON.parse(sessionStorage.getItem('ms_username')).permissions;
            let authStr = userAuth
                .map(it => {
                    return it.name;
                })
                .join(',');
            if (authStr.indexOf(auth) > -1) {
                this.$router.push(url);
            } else {
                this.$message.error('您没有权限');
            }
        },

        /**
         * @Description:创建地图
         * @Author:chen
         * @Date:2019-12-13
         */
        createMap(data) {
            var map = new AMap.Map('map', {
                mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
                zoom: 6.5,
                center: [106.33, 29.35]
                // features: ['bg', 'road']
            });
            let newData = [
                { name: '重庆', coordinate: '106.54;29.59' },
                { name: '綦江', coordinate: '106.56;29.41' },
                { name: '长寿', coordinate: '106.64;29.01' },
                { name: '南桐', coordinate: '107.04;29.86' },
                { name: '合川', coordinate: '106.28;29.26' },
                { name: '潼南', coordinate: '106.22;30.03' },
                { name: '铜梁', coordinate: '105.8;30.16' },
                { name: '壁山', coordinate: '106.03;29.86' },
                { name: '荣昌', coordinate: '106.21;29.62' },
                { name: '大足', coordinate: '105.59;29.4' },
                { name: '永川', coordinate: '105.71;29.75' },
                { name: '万盛', coordinate: '105.91;29.38' }
            ];

            let list = data.map(it => {
                let query = {
                    address: it.coordinate ? it.coordinate.split(',') : '',
                    name: it.name
                };
                return query;
            });
            let markerList = [];
            // var startIcon = new AMap.Icon({
            //     // 图标尺寸
            //     size: new AMap.Size(32, 32),
            //     // 图标的取图地址
            //     image: require('@/assets/img/address.png'),
            //     // 图标所用图片大小
            //     imageSize: new AMap.Size(32, 32)
            //     // 图标取图偏移量
            //     // imageOffset: new AMap.Pixel(-9, -3)
            // });
            // list.forEach(it => {
            //     if (it.address) {
            //         let marker = new AMap.Marker({
            //             position: new AMap.LngLat(it.address[0], it.address[1]),
            //             // content: content,
            //             icon: startIcon
            //         });
            //         markerList.push(marker);
            //     }
            // });
            map.add(markerList);

            // var
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    .home-img {
        text-align: center;
    }
    .home-show {
        .show-top {
            display: flex;
            justify-content: space-between;
            .show-item {
                margin: 20px 0px;
                width: 14%;
                font-size: 18px;
                .item-number {
                    color: rgba(38, 127, 249);
                    font-size: 30px;
                    margin-bottom: 10px;
                }
            }
        }
        .entrance-title {
            margin: 1rem 0 1rem 0;
        }
        .show-entrance {
            display: flex;
            justify-content: space-between;
            margin: 2rem 0 4rem;
            .entrance-item {
                background-color: rgba(38, 127, 249);
                color: white;
                width: 14%;
                line-height: 3rem;
                text-align: center;
                height: 3rem;
                border-radius: 0.5rem;
                font-size: 16px;
                box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                transition: all 0.25s ease-in-out;
                &:hover {
                    margin-top: -0.5rem;
                }
            }
        }
    }
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
#map {
    width: 100%;
    height: 500px;
    margin-top: 2rem;
}
.marker-pointer {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 100%;
}
</style>
