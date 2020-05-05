<template>
    <div>
        <!-- 导入试卷弹出框 -->
        <el-dialog
            title="导入试卷"
            :visible.sync="showImport"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-upload
                class="upload-demo"
                ref="upload"
                drag
                :file-list="fileList"
                action="/manager/courseManagement/importQuestionExcel"
                :data="currentData"
                :auto-upload="false"
                :on-change="changeFile"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError"
                :headers="header"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传xlx/xlxs文件,且上传试卷内容将会覆盖原来的试卷。</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showImport = false">取 消</el-button>
                <el-button type="primary" @click="downMo">下载模板</el-button>
                <el-button type="primary" @click="comfirmImport">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import url from '@/utils/http';
export default {
    props: {
        show: {
            type: Boolean,
            value: false
        },
        data: {
            type: Object,
            value: {}
        }
    },
    data() {
        return {
            showImport: false, //是否显示导入试卷弹窗
            fileList: [],
            currentData: {}, //额外参数
            header: {
                token: ''
            }
        };
    },
    watch: {
        show: {
            handler(val) {
                this.showImport = val;
                if (val) {
                    let token = sessionStorage.getItem('token');
                    let header = JSON.parse(JSON.stringify(this.header));
                    if (token) {
                        header.token = token;
                        this.header = header;
                    } else {
                    }
                }
            }
        },
        data: {
            handler(val) {
                this.currentData = val;
            },
            immediate: true,
            deep: true
        },
        showImport: {
            handler(val) {
                if (!val) {
                    this.$refs.upload.clearFiles();
                    this.$emit('close');
                }
            }
        }
    },
    methods: {
        /**
         * @Description:上传之前
         * @Author:chen
         * @Date:2019-12-16
         */
        beforeAvatarUpload(file) {
            let name = file.name.split('.');
            let type = name[name.length - 1];
            let next = true;
            if (type != 'xls' && type != 'XLS' && type != 'xlsx' && type != 'XLSX') {
                this.$message.error('请上传excel文件');
                next = false;
            }

            return next;
        },
        /**
         * @Description:只能选择一个文件
         * @Author:chen
         * @Date:2019-12-16
         */
        changeFile(file, fileList) {
            let item = [];
            item.push(file);
            this.fileList = item;
        },
        /**
         * @Description:上传试卷
         * @Author:chen
         * @Date:2019-12-16
         */
        comfirmImport() {
            this.$refs.upload.submit();
            // let str = '?courseId=' + this.currentData.courseId + '&courseCatalog=' + this.currentData.courseCatalog;
            // let query = {
            //     file: this.fileList[0]
            // };
            // let header = {
            //     'Content-Type': 'multipart/form-data'
            // };
            // this.axios
            //     .post('/manager/courseManagement/importQuestionExcel' + str, query, header)
            //     .then(res => {
            //         this.$message.success('上传成功');
            //         this.$refs.upload.clearFiles();
            //         setTimeout(() => {
            //             // this.fileList = [];
            //             this.$emit('close');
            //         }, 100);
            //     })
            //     .catch(err => {});
        },
        /**
         * @Description:上传成功
         * @Author:chen
         * @Date:2019-12-16
         */
        handleAvatarSuccess(res, file) {
        
            if (res.status == 200) {
                this.$message.success('上传成功');
                this.$refs.upload.clearFiles();
                setTimeout(() => {
                    // this.fileList = [];
                    this.$emit('close');
                }, 100);
            } else {
                this.$message.error(res.msg);
                this.$refs.upload.clearFiles();
            }
        },
        /**
         * @Description:上传失败
         * @Author:chen
         * @Date:2019-12-16
         */

        handleAvatarError(res, file) {
            this.$message.error(res.msg);
        },
        /**
         * @Description:下载模板
         * @Author:chen
         * @Date:2019-12-16
         */
        downMo() {
            let http = url.url;
            var link = document.createElement('a');
            link.download = '爱悦教育导入试卷模板.xls';
            link.style.display = 'none';
            link.href = url.url + '/excel/爱悦教育导入试卷模板.xls';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};
</script>

<style lang="less" scoped>
/deep/ .upload-demo {
    text-align: center;
}
/deep/ .el-dialog__footer {
    text-align: center;
}
</style>