<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="flex-row flex-between">
                <div class="flex-row">
                    <el-input
                        placeholder="请输入真实姓名"
                        clearable
                        v-model="search.actualName"
                        class="mr-20"
                    ></el-input>
                    <el-input
                        placeholder="请输入身份证号"
                        clearable
                        v-model="search.idNumber"
                        class="mr-20"
                    ></el-input>
                    <el-input placeholder="请输入手机号" clearable v-model="search.phone" class="mr-20"></el-input>
                    <el-input placeholder="请输入邮箱" clearable v-model="search.mailbox" class="mr-20"></el-input>
                    <el-input placeholder="请输入昵称" clearable v-model="search.nickname" class="mr-20"></el-input>
                    <el-button type="primary" @click="doSearch">搜索</el-button>
                </div>
                <div></div>
            </div>
            <el-table class="mt-20" border v-loading="tableLoading" :data="tableList">
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column align="center" label="真实姓名" prop="actualName"></el-table-column>
                <el-table-column align="center" label="本人照片">
                    <template slot-scope="scope">
                        <el-image
                            style="width:3rem;height:3rem"
                            fit="cover"
                            :src="scope.row.face"
                            :preview-src-list="[scope.row.face]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性别">
                    <template slot-scope="scope">{{scope.row.gender=='MALE'?'男':"女"}}</template>
                </el-table-column>
                <el-table-column align="center" label="身份证号" prop="idNumber"></el-table-column>

                <el-table-column align="center" label="昵称" prop="nickname"></el-table-column>
                <el-table-column align="center" label="头像">
                    <template slot-scope="scope">
                        <el-image
                            style="width:3rem;height:3rem"
                            fit="cover"
                            :src="scope.row.avatar"
                            :preview-src-list="[scope.row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="电话" prop="phone"></el-table-column>
                <el-table-column align="center" label="邮箱" prop="mailbox"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <div>
                            <el-tag
                                v-if="scope.row.certification=='UNREVIEWED' || !scope.row.certification"
                            >待审核</el-tag>
                            <el-tag v-if="scope.row.certification=='PASS'" type="success">已通过</el-tag>
                            <el-tag v-if="scope.row.certification=='CANCEL'" type="info">已取消</el-tag>
                            <el-tag v-if="scope.row.certification=='REJECTED'" type="danger">已拒绝</el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                        <el-button
                            slot="reference"
                            type="primary"
                            class="mr-20"
                            @click="lookDetail(scope.row)"
                        >审核</el-button>
                        <el-popconfirm title="确定删除该用户吗？" @onConfirm="del(scope.row)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <Pagination :data="pageData" @currentChange="currentChange" />
            </div>
        </div>
        <el-dialog title="用户详情" class="add-role-modal" :visible.sync="detail.show" width="48%">
            <div class="modal-box">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">真实姓名：</div>
                            <div>{{detail.content.actualName}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">
                                性别：
                                <span></span>
                            </div>
                            <div>{{detail.content.gender=='MALE'?'男':'女'}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">出生日期：</div>
                            <div>{{detail.content.birthday}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-10">
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">身份证号：</div>
                            <div>{{detail.content.idNumber}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">
                                手机号：
                                <span></span>
                            </div>
                            <div>{{detail.content.phone}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">
                                邮箱：
                                <span></span>
                            </div>
                            <div>{{detail.content.mailbox}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-10">
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">
                                昵称：
                                <span></span>
                            </div>
                            <div>{{detail.content.nickname}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">
                                用户名：
                                <span></span>
                            </div>
                            <div>{{detail.content.username}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-row align-top">
                            <div class="info-label">登录密码：</div>
                            <div>{{detail.content.password}}</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt-10">
                    <el-col :span="8">
                        <div class="info-label">本人照片：</div>
                        <div class="info-img">
                            <el-image :src="detail.content.face" :preview-src-list="[detail.content.face]">
                                <div slot="placeholder" class="image-slot">
                                    <i class="el-icon-loading"></i>
                                    <span>加载中</span>
                                </div>
                            </el-image>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-label">用户头像：</div>
                        <div class="info-img">
                            <el-image :src="detail.content.avatar" :preview-src-list="[detail.content.avatar]">
                                <div slot="placeholder" class="image-slot">
                                    <i class="el-icon-loading"></i>
                                    <span>加载中</span>
                                </div>
                            </el-image>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-label">身份证：</div>
                        <div class="info-img">
                            <el-image :src="detail.content.idNumberPhoto" :preview-src-list="[detail.content.idNumberPhoto]">
                                <div slot="placeholder" class="image-slot">
                                    <i class="el-icon-loading"></i>
                                    <span>加载中</span>
                                </div>
                            </el-image>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="flex-end flex-row mt-20">
                <el-button v-loading="authLoading" type="primary" @click="auth(true)">通过</el-button>
                <el-button v-loading="authLoading" @click="auth(false)">拒绝</el-button>
            </div>
        </el-dialog>

        <el-dialog title="备注" class="note-modal" :visible.sync="noteShow" width="25%">
            <div>
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{
                    minRows:3,
                    maxRows:6

                }"
                    v-model="noteValue"
                    placeholder="请输入备注"
                ></el-input>
            </div>
            <div class="flex-row flex-end mt-20">
                <el-button type="primary" @click="saveNote">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue';
export default {
    components: {
        Pagination
    },
    data() {
        return {
            detail: {
                show: false,
                content: ''
            },

            noteShow: false,
            noteValue: '',
            pageObject: {
                pageNum: 0,
                pageSize: 10
            }, //页码
            tableLoading: false, //表格loading
            authLoading: false,
            tableList: [],
            pageData: {}, //分页数据
            search: {
                actualName: '',
                nameStatus: true //模糊还是精准搜索
            }, //搜索内容
            addInfo: {
                name: '',
                note: '',
                presenceStatus: 1
            },
            showAdd: false,
            rules: {
                name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                note: [{ required: true, message: '请输入备注', trigger: 'blur' }]
            },
            doConfirm: ''
        };
    },
    created() {
        this.getList();
    },
    methods: {
        /**
         * @description:搜索
         */
        doSearch() {
            this.pageObject.pageNum = 0;
            this.getList();
        },
        /**
         * @description:获取列表
         */
        getList() {
            let query = {
                ...this.pageObject,
                filers: this.func.doSearch(this.search)
            };
            this.tableLoading = true;
            this.axios
                .get('/manage/user/userAudit', {
                    params: query
                })
                .then(res => {
                    this.tableLoading = false;
                    this.tableList = res.data.content;
                    this.pageData = res.data;
                })
                .catch(err => {
                    this.tableLoading = false;
                });
        },
        /**
         * @description:打开或关闭详情窗口
         */
        showDetail() {
            this.detail.show = !this.detail.show;
            this.detail = Object.assign({}, this.detail);
        },
        /**
         * @description:保存备注
         */
        saveNote() {
            if (!this.noteValue.trim()) {
                this.$message.error('请输入备注');
                return;
            }
            this.noteShow = false;
            this.doConfirm(false);
        },
        /**
         * @description:审核
         */
        auth(status) {
            if (!status) {
                this.doConfirm = this.submitAuth;
                this.noteShow = true;
            } else {
                this.submitAuth(status);
            }
        },
        submitAuth(status) {
            let query = {
                certification: status ? 'PASS' : 'REJECTED',
                userId: this.detail.content.id
            };
            if (this.noteValue) {
                query.note = this.noteValue.trim();
            }
            this.authLoading = true;
            this.axios
                .post('/manage/user/userAudit', query)
                .then(res => {
                    this.authLoading = false;
                    this.noteValue = ""
                    this.$message.success(status ? '通过成功' : '拒绝成功');
                    this.showDetail();
                    this.getList();
                })
                .catch(err => {
                    this.authLoading = false;
                });
        },
        /**
         * 查看详情
         */
        lookDetail(item) {
            this.detail.content = item;
            this.showDetail();
        },
        /**
         * @description:删除
         */
        del(item) {
            let query = {
                ids: item.id
            };
            this.tableLoading = true;
            this.axios
                .delete('', {
                    params: query
                })
                .then(res => {
                    this.$message.success('删除成功');
                    this.getList();
                });
        },
        /**
         * @description:分页
         */
        currentChange(e) {
            this.pageObject.pageNum = e;
            this.getList();
        }
    }
};
</script>

<style lang="less" scoped>
.add-role-modal {
    /deep/.el-dialog {
        min-width: 914px;
    }
}
.note-modal {
    /deep/.el-dialog {
        min-width: 500px;
    }
}
.flex-row {
    display: flex;
    align-items: center;
}
.flex-end {
    justify-content: flex-end;
}
.flex-between {
    justify-content: space-between;
}
.align-top {
    align-items: flex-start;
}
.mt-20 {
    margin-top: 20px;
}
.mr-20 {
    margin-right: 20px;
}
.mt-10 {
    margin-top: 10px;
}
.w-33 {
    width: 33%;
}
.modal-box {
    .info-label {
        width: 70px;
        text-align: justify;
        span {
            display: inline-block /* Opera */;
            padding-left: 100%;
        }
    }
    .info-img {
        width: 277.98px;
        height: 156.36px;
        position: relative;
        margin-top: 10px;
        background-color: rgba(0, 0, 0, 0.05);
        /deep/.el-image {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .image-slot {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            margin: 0 auto;
            transform: translateY(-50%);
            text-align: center;
            color: gray;
        }
    }
}
</style>