<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户资料
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
                    <el-input
                        placeholder="请输入手机号"
                        clearable
                        v-model="search.phone"
                        class="mr-20"
                    ></el-input>
                    <el-input
                        placeholder="请输入邮箱"
                        clearable
                        v-model="search.mailbox"
                        class="mr-20"
                    ></el-input>
                    <el-input
                        placeholder="请输入昵称"
                        clearable
                        v-model="search.nickname"
                        class="mr-20"
                    ></el-input>
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

                <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                        <el-popconfirm :title="'确定'+(scope.row.status?'封禁':'解封')+'该用户吗？'" @onConfirm="ban(scope.row)">
                            <el-button
                                slot="reference"
                                type="primary"
                                class="mr-20"
                            >{{scope.row.status?'封禁':"解封"}}</el-button>
                        </el-popconfirm>
                        <el-button
                            slot="reference"
                            type="primary"
                            class="mr-20"
                            @click="lookDetail(scope.row)"
                        >详情</el-button>
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
                            <el-image :src="detail.content.face">
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
                            <el-image :src="detail.content.avatar">
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
                            <el-image :src="detail.content.idNumberPhoto">
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
                <el-button @click="showDetail">关闭</el-button>
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

            pageObject: {
                pageNum: 0,
                pageSize: 10
            }, //页码
            tableLoading: false, //表格loading
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
            }
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
                .get('/manage/user/user', {
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
         * 查看详情
         */
        lookDetail(item) {
            this.detail.content = item;
            this.showDetail();
        },
        /**
         * @description:封禁or解封
         * @param item
         */
        ban(item) {
            let query = {
                ...item
            };
            query.status = query.status == 1 ? 0 : 1;
            this.tableLoading = true;
            this.axios.post('/manage/user/user', query).then(res => {
                this.$message.success(query.status == 0 ? '封禁成功' : '解封成功');
                this.getList();
            });
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
/deep/.el-dialog {
    min-width: 914px;
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