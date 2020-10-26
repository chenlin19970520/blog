<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单统计
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="flex-row flex-between">
                <div class="flex-row">
                    <el-input placeholder="标签名称" clearable v-model="search.name" class="mr-20"></el-input>
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
                <el-table-column align="center" prop="name" label="标签" ></el-table-column>
                <el-table-column align="center" prop="note" label="备注" ></el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="edit(scope.row)" class="mr-20">编辑</el-button>
                        <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="delItem(scope.row)">
                            <el-button slot="reference" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
                        <div>
                <Pagination :data="pageData" @currentChange="currentChange"/>
            </div>
        </div>
        <el-dialog title="添加标签" class="add-role-modal" :visible.sync="showAdd" width="25%">
            <div>
                <el-form label-width="80px" :model="addInfo" :rules="rules" ref="addInfo">
                    <el-form-item label="标签名称" prop="name">
                        <el-input placeholder="请输入标签名称" v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="note">
                        <el-input placeholder="请输入备注" v-model="addInfo.note"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="flex-end flex-row">
                <el-button @click="showAddModel">取消</el-button>
                <el-button type="primary" v-loading="saveLoading" @click="addItem">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
export default {
    components:{
        Pagination
    },
    data() {
        return {
            saveLoading:false,
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
                name: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
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
                .get('/manage/article/label', {
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
         * @description:打开添加弹窗
         */
        showAddModel(item) {
            this.showAdd = !this.showAdd;
            this.addInfo = item
                ? Object.assign({}, item)
                : {
                      name: '',
                      note: '',
                      menuIds: [],
                      presenceStatus: 1
                  };
        },
        /**
         * @description:添加标签
         */
        addItem() {
            this.$refs.addInfo.validate(valid => {
                if (valid) {
                    let query = {
                        ...this.addInfo
                    };
                    this.saveLoading = true;
                    this.axios
                        .post('/manage/article/label', query)
                        .then(res => {
                            this.saveLoading = false;
                            this.$message.success(query.id ? '保存成功' : '添加成功');
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