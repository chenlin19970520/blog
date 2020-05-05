<template>
    <div>
        <div v-if="!upload">
            <el-upload
                ref="upload"
                class="upload-demo"
                action
                :disabled="uploadLoading"
                v-loading="uploadLoading"
                :limit="1"
                :http-request="selectVideo"
            >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class="mt-top" v-if="show">
            <el-progress :stroke-width="5" :percentage="percentage"></el-progress>
        </div>
        <!-- <video :src="url" autoplay loop></video> -->
        <div class="mt-top" id="preview"></div>
    </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
// import QPlayer from '../../assets/js/qiniu-web-player-1.2.3';
export default {
    name: 'qiniu',
    data() {
        return {
            percentage: 0,
            uploadLoading: false,
            show: false,
            player: '',
            url: '',
            key: ''
        };
    },
    props: {
        address: {
            type: String,
            value: ''
        },
        close: {
            type: Boolean,
            value: false
        },
        upload: {
            type: Boolean,
            value: false
        }
    },

    watch: {
        address: {
            handler(val) {
                if (val) {
                    this.key = val;
                    this.getVideoUrl(this.key);
                }
            },
            immediate: true
        },
        close: {
            handler(val) {
                if (val) {
                    if (this.player) {
                        this.player.destroy();
                        this.player = '';
                        this.url = '';
                        this.key = '';
                    }
                    if (!this.$props.upload) {
                        this.$refs.upload.clearFiles();
                    }
                    this.$emit('close');
                } else {
                    this.createVideo();
                }
            }
        }
        // if (this.$props.address) {
        //     this.url = this.$props.address;
        //     this.createVideo();
        // }
    },
    mounted() {
        // if (this.url) {
        //     this.createVideo();
        // } else if (this.key) {
        //     this.getVideoUrl(this.key);
        // }
    },
    methods: {
        createVideo(key) {
            if (this.player) {
                this.player.destroy();
            }
            this.player = new QPlayer({
                url: this.url,
                container: document.getElementById('preview')
            });
            this.player.on('ready', () => {
                if (!this.$props.upload) {
                    this.$refs.upload.clearFiles();
                }
                this.$emit('back', this.url, this.player.totalTime, key);
            });
        },
        selectVideo(e) {
            let file = e.file;
            let list = file.name.split('.');
            let key = new Date().getTime() + '.' + list[list.length - 1];
            let putExtra = {
                fname: file.name,
                params: {
                    type: 'course_catalog',
                    typeId: ''
                },
                mimeType: ['video/mp4']
            };
            let config = {
                useCdnDomain: true,
                region: null
            };
            let _this = this;
            let observer = {
                next(res) {
                    _this.show = true;
                    _this.percentage = Math.floor(res.total.percent);
                    if (_this.percentage == 100) {
                        _this.show = false;
                        _this.getVideoUrl(key);
                        _this.uploadLoading = false;
                    }
                },
                error(err) {}
            };
            this.axios.get('/universal/upload').then(res => {
                let qiniuToken = res.data;
                this.uploadLoading = true;
                var observable = qiniu.upload(file, key, qiniuToken, putExtra, config);
                var subscription = observable.subscribe(observer); // 上传开始
            });
        },
        getVideoUrl(key) {
            this.axios
                .get('/universal/getFileUrl', {
                    params: { key: key }
                })
                .then(res => {
                    this.url = res.data;
                    this.createVideo(key);
                });
        }
    }
};
</script>

<style lang="less" scoped>
#preview {
    width: 100%;
    height: 400px;
    min-height: 400px;
    /* max-width: 400px; */
}
.mt-top {
    margin-top: 1rem;
}
/* #uploadVideo {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
} */
/deep/ .el-upload--text {
    border: 0px;
    width: auto;
    height: auto;
}
/deep/ .el-upload-list__item {
    max-width: 400px;
    margin-top: 0;
}
.el-dialog {
    /deep/ .el-dialog__body {
        padding: 30px 20px 0px 20px;
    }
}
/deep/ .qplayer-time {
    width: auto !important;
}
/deep/ .qplayer-volume_value {
    white-space: nowrap !important;
}
</style>
