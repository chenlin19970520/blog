<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 文章评论
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="flex-row flex-between">
                <div class="flex-row">
                    <el-input placeholder="角色名称" clearable v-model="search.name" class="mr-20"></el-input>
                    <el-button type="primary" @click="doSearch">搜索</el-button>
                </div>
            </div> -->
            <el-table
                class="mt-20"
                border
                v-loading="tableLoading"
                :data="tableList"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                >
                <el-table-column label="序号" align="center" width="80">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column align="center" label="回复内容" prop="content"></el-table-column>
                <el-table-column align="center" label="回复时间">
                    <template slot-scope="scope">{{scope.row.createTime | createTime}}</template>
                </el-table-column>
            </el-table>
            <div>
                <Pagination :data="pageData" @currentChange="currentChange" />
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue';
export default {
    components: {
        Pagination
    },
    filters: {
        createTime(time) {
            let date = time ? new Date(time) : new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let h = date.getHours();
            let mi = date.getMinutes();
            let s = date.getSeconds();
            let str = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
            str =  str + ' ' + (h < 10 ? '0' + h : h) + ':' + (mi < 10 ? '0' + mi : mi) + ':' + (s < 10 ? '0' + s : s);
            return str;
        }
    },
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
    created() {
        this.getList();
    },
    computed: {
        articleId() {
            return this.$route.query.id;
        }
    },
    watch: {
        articleId(val) {
            if (val) {
                this.getList();
            }
        }
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
                articleId: this.articleId,
                filers: this.func.doSearch(this.search)
            };
            this.tableLoading = true;
            this.axios
                .get('/manage/article/comment', {
                    params: query
                })
                .then(res => {
                    this.tableLoading = false;

                    this.tableList = res.data.content.map(it => {
                        it.children = it.subs;
                        return it;
                    });
                    this.pageData = res.data;
                    console.log(this.tableList);
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