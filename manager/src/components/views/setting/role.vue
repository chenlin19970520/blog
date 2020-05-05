<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="flex-row flex-between">

                <div class="flex-row">
                    <el-input placeholder="角色名称" clearable v-model="search.name" class="mr-20"></el-input>
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
                <el-table-column label="角色名" align="center" prop="name"></el-table-column>
                <el-table-column label="备注" align="center" prop="note"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)" class="mr-20">编辑</el-button>
                        <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="delRole(scope.row)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <Pagination :data="pageData" @currentChange="currentChange"/>
            </div>
        </div>

        <el-dialog title="添加角色" class="add-role-modal" :visible.sync="show.add" width="25%">
            <div>
                <el-form label-width="80px" :model="addInfo" :rules="rules" ref="addInfo">
                    <el-form-item label="角色名称" prop="name">
                        <el-input placeholder="请输入角色名称" v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择权限" prop="menuIds" v-model="addInfo.menuIds">
                        <el-button type="primary" @click="openAuth">点击选择</el-button>
                    </el-form-item>
                    <el-form-item label="备注" prop="note">
                        <el-input placeholder="请输入备注" v-model="addInfo.note"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex-end flex-row">
                <el-button @click="showAddModel">取消</el-button>
                <el-button type="primary" v-loading="saveLoading" @click="addRoles">{{addInfo.id?'保存':'添加'}}</el-button>
            </div>
        </el-dialog>

        <auth :list="copyMenuList" @select="getSelectMenu" :show="authShow" @close="openAuth"></auth>
    </div>
</template>

<script>
import auth from '@/components/common/auth.vue';
import Pagination from '@/components/common/Pagination.vue'
export default {
    components: {
        auth,
        Pagination
    },
    data() {
        return {
            pageObject: {
                pageNum: 0,
                pageSize: 10
            },
            filers: {},
            times: {},
            search:{
                name:""
            },//搜索
            saveLoading: false, //保存loaing
            tableLoading: false,
            tableList: [], //角色列表
            pageData:{},//分页列表
            menuList: [], //菜单列表
            copyMenuList: [], //

            show: {
                add: false
            }, //显示弹窗
            authShow: false, //权限弹窗显示
            addInfo: {
                name: '',
                note: '',
                menuIds: []
            }, //添加角色信息
            rules: {
                name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                note: [{ required: true, message: '请输入备注', trigger: 'blur' }],
                menuIds: [
                    { type: 'array', required: true, message: '请选择权限', trigger: 'blur' },
                    {
                        type: 'array',
                        min: 1,
                        message: '请选择权限',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
        this.getMenu();
    },
    methods: {
        /**
         * @description:获取角色列表
         */
        getList() {
            let query = {
                ...this.pageObject,
                   filers: this.func.doSearch(this.search)
            };
            this.tableLoading = true;
            this.axios
                .get('/manage/manager/role', {
                    params:query
                })
                .then(res => {
                    this.tableLoading = false;
                    this.tableList = res.data.content;
                    this.pageData =res.data;
                })
                .catch(err => {
                    this.tableLoading = false;
                });
        },
        /**
         * 搜索
         */
        doSearch(){
            this.pageObject.pageNum = 0;
            this.getList();
        },
        /**
         * @description:获取菜单
         */
        getMenu() {
            this.axios.get('/manage/manager/menu', {}).then(res => {
                this.menuList = res.data;
            });
        },
        /**
         * @description:打开角色管理弹窗
         */
        showAddModel(item) {
            this.show.add = !this.show.add;
            this.addInfo = item
                ? Object.assign({}, item)
                : {
                      name: '',
                      note: '',
                      menuIds: []
                  };
            this.updateShow();
        },
        /**
         * @description:更新show
         */
        updateShow() {
            this.show = Object.assign({}, this.show);
        },

        /**
         * @description:打开权限弹窗
         */
        openAuth() {
            this.authShow = !this.authShow;
            this.copyMenuList = [];
            if (this.authShow) {
                this.copyMenuList = this.menuList;
            }
        },
        /**
         * @description：获取权限
         */
        getSelectMenu(e) {
            this.menuList = e;
            let menuIds = [];
            let list = this.menuList.map(it => {
                return it.subs.filter(it => {
                    return it.check;
                });
            });
            list.forEach(it => {
                if (it && it.length) {
                    it.forEach(item => {
                        menuIds.push(item.id);
                    });
                }
            });
            this.addInfo.menuIds = menuIds;
            this.addInfo = Object.assign({}, this.addInfo);
            this.openAuth();
        },
        /**
         * @description:添加角色
         */
        addRoles() {
            this.$refs.addInfo.validate(valid => {
                if (valid) {
                    let query = {
                        ...this.addInfo,
                        presenceStatus: 1
                    };
                    this.saveLoading = true;
                    this.axios
                        .post('/manage/manager/role', query)
                        .then(res => {
                            this.saveLoading = false;
                              this.$message.success(query.id?'保存成功':'添加成功');
                            this.getList();
                            this.showAddModel();
                        })
                        .catch(err => {
                            this.saveLoading = false;
                        });
                }
            });
        },
        /**
         * @description:去编辑.
         */
        edit(item) {
            this.showAddModel(item);
        },
        /**
         * @description:删除管理员
         */
        delRole(item) {
            let query = {
                ids: item.id
            };
            this.tableLoading = true;
            this.axios.delete('/manage/manager/role', {
                params:query
            }).then(res => {
                    this.$message.success("删除成功")

                this.getList();
            });
        },
        /**
         * @description:分页
         */
        currentChange(e){
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
.flex-between{
    justify-content: space-between;
}
.flex-end {
    justify-content: flex-end;
}
.mt-20 {
    margin-top: 20px;
}
.mr-20{
    margin-right: 20px;
}
.add-role-modal {
    /deep/.el-dialog {
        min-width: 480px !important;
    }
}
</style>