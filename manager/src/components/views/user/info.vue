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
                    <el-input placeholder="用户名称" clearable v-model="search.name" class="mr-20"></el-input>
                    <el-button type="primary" @click="doSearch">搜索</el-button>
                </div>
                <div>
      
                </div>
            </div>
            <el-table class="mt-20" border v-loading="tableLoading" :data="tableList">
                <el-table-column label="序号" align="center" width="50">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column align="center" label="真实姓名" prop="actualName"></el-table-column>
                <el-table-column align="center" label="头像">
                    <template slot-scope="scope">
                        <el-image style="width:3rem;height:3rem" fit="cover" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)" class="mr-20">编辑</el-button>
                        <el-popconfirm title="确定删除该用户吗？" @onConfirm="delItem(scope.row)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageObject: {
                pageNum: 0,
                pageSize: 10
            }, //页码
            tableLoading: false, //表格loading
            tableList: [],
            pageData: {}, //分页数据
            search: {
                name: '',
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
</style>