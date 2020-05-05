<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 管理员管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="flex-row flex-between">
                <div class="flex-row">
                    <el-input placeholder="管理员姓名" clearable v-model="search.name" class="mr-20"></el-input>
                    <el-input placeholder="登录用户名" clearable v-model="search.username" class="mr-20"></el-input>
                    <div>
                        <el-select v-model="search.type" class="mr-20">
                            <el-option
                                v-for="(item,index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" @click="doSearch">搜索</el-button>
                </div>
                <div>
                    <el-button type="primary" @click="showAddModel">创建</el-button>
                </div>
            </div>
            <el-table class="mt-20" border v-loading="tableLoading" :data="tableList">
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column align="center" label="管理员名称" prop="name"></el-table-column>
                <el-table-column align="center" label="登录用户名" prop="username"></el-table-column>
                <el-table-column align="center" label="管理员类型" prop="type">
                    <template slot-scope="scope">{{scope.row.type=='MANAGER'?'管理员':'超级管理员'}}</template>
                </el-table-column>
                <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>

                <!-- <el-table-column align="center"></el-table-column> -->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)" class="mr-20">编辑</el-button>
                        <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="delAdmin(scope.row)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <Pagination :data="pageData" @currentChange="currentChange" />
            </div>
        </div>
        <el-dialog title="添加管理员" class="add-role-modal" :visible.sync="showAdd" width="30%">
            <div>
                <el-form label-width="100px" :model="addInfo" :rules="rules" ref="addInfo">
                    <el-form-item label="管理员姓名" prop="name">
                        <el-input placeholder="请输入管理员姓名" v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录用户名" prop="username">
                        <el-input placeholder="请输入登录用户名" v-model="addInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="password">
                        <el-input placeholder="请输入登录密码" v-model="addInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员类型" prop="type">
                        <el-select v-model="addInfo.type">
                            <el-option
                                v-for="(item,index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.key"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属角色" prop="roleIds">
                        <el-select v-model="addInfo.roleIds" multiple>
                            <el-option
                                v-for="(item,index) in roleList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex-end flex-row">
                <el-button @click="showAddModel">取消</el-button>
                <el-button
                    type="primary"
                    v-loading="saveLoading"
                    @click="addAdmin"
                >{{addInfo.id?'保存':'添加'}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import md5 from 'md5';
import Pagination from '@/components/common/Pagination.vue';
export default {
    components: {
        Pagination
    },
    data() {
        return {
            pageObject: {
                pageNum: 0,
                pageSize: 10
            },
            times: {},
            search: {
                name: '',
                nameStatus: false, //模糊还是精准
                username: '',
                type: ''
            },
            tableLoading: false, //表格loading
            tableList: [], //列表数据
            pageData: {},
            addInfo: {
                name: '', //姓名
                username: '', //用户登陆名
                password: '', //登录密码
                passwordMd5: '', //检验登录密码
                presenceStatus: 1,
                roleIds: [],
                type: '' //SUPER_MANAGER,MANAGER
            },
            roleList: [], //角色列表
            typeList: [
                {
                    name: '超级管理员',
                    key: 'SUPER_MANAGER'
                },
                {
                    name: '管理员',
                    key: 'MANAGER'
                }
            ],
            showAdd: false,
            saveLoading: false,
            rules: {
                name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                username: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
                type: [{ required: true, message: '请选择类型', trigger: 'change' }],
                roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }]
            }
        };
    },
    created() {
        this.getList();
        this.getRoleList();
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
                .get('/manage/manager/manager', {
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
         * @description:获取管理员的角色列表
         */
        getRoleList() {
            let query = {
                pageNum: 1,
                pageSize: 999
            };
            this.axios.get('/manage/manager/role', query).then(res => {
                this.roleList = res.data.content;
            });
        },
        /**
         * @description:打开管理员管理弹窗
         */
        showAddModel(item) {
            this.getRoleList();
            this.showAdd = !this.showAdd;
            this.addInfo = item
                ? Object.assign({}, item)
                : {
                      name: '',
                      note: '',
                      menuIds: []
                  };
        },
        edit(item) {
            console.log(item);
            this.showAddModel(item);
        },
        /**
         * @description:添加管理员
         */
        addAdmin() {
            this.$refs.addInfo.validate(valid => {
                if (valid) {
                    let query = {
                        ...this.addInfo,
                        passwordMd5: md5(this.addInfo.password)
                    };
                    this.saveLoading = true;
                    this.axios
                        .post('/manage/manager/manager', query)
                        .then(res => {
                            this.saveLoading = false;
                            this.$message.success(query.id ? '保存成功' : '添加成功');
                            this.getList();
                            this.showAddModel();
                        })
                        .catch(err => {
                            this.saveLoading = false;
                            // this.$message.error('错误');
                        });
                }
            });
        },
        /**
         * 删除管理员
         */
        delAdmin(item) {
            let query = {
                ids: item.id
            };
            this.tableLoading = true;
            this.axios
                .delete('/manage/manager/manager', {
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
.mt-20 {
    margin-top: 20px;
}
.mr-20 {
    margin-right: 20px;
}
/deep/.el-select {
    width: 180px;
}
</style>