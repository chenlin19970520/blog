<template>
    <div>
        <div>
            <el-upload
                v-loading="imgLoading"
                ref="upload"
                class="avatar-uploader"
                :show-file-list="false"
                action
                :limit="1"
                :http-request="selectVideo"
            >
                <img v-if="url" :src="url" class="avatar" />
                <i
                    style="position:absolute;top:48%;"
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                ></i>
            </el-upload>
        </div>
    </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
// import QPlayer from '../../assets/js/qiniu-web-player-1.2.3';
export default {
    name: 'qiniu',
    data() {
        return {
            imgLoading: false,
            url: '',
            percentage: 0
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
        }
    },

    watch: {
        address: {
            handler(val) {
                this.url = val;
            },
            immediate: true
        },
        close: {
            handler(val) {
                if (val) {
                    this.$refs.upload.clearFiles();
                }
            }
        }
    },
    methods: {
        selectVideo(e) {
           
            let file = e.file;
            let list = file.name.split('.');
            if (list[list.length - 1] != 'png' && list[list.length - 1] != 'jpeg' && list[list.length - 1] != 'jpg') {
                this.$message.error('选择文件错误');
                this.$refs.upload.clearFiles();
                return;
            }
            let key = new Date().getTime() + '.' + list[list.length - 1];
            let putExtra = {
                fname: file.name,
                params: {
                    type: 'course_catalog',
                    typeId: ''
                },
                mimeType: ['image/png', 'image/jpeg']
            };
            let config = {
                useCdnDomain: true,
                region: null
            };
            let _this = this;
            let observer = {
                next(res) {
                   
                    _this.percentage = Math.floor(res.total.percent);
                    if (_this.percentage == 100) {
                        _this.getVideoUrl(key);
                    }
                },
                error(err) {
                   
                    this.$message.error('上传错误');
                    this.$refs.upload.clearFiles();
                }
            };
            this.imgLoading = true;
            this.axios.get('/universal/upload').then(res => {
                let qiniuToken = res.data;
                var observable = qiniu.upload(file, key, qiniuToken, putExtra, config);
                this.$emit("uploadBefore")
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
                    this.imgLoading = false;
                    this.$refs.upload.clearFiles();
                    this.$emit('back', this.url, key);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.avatar {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
