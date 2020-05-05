<template>
    <div class="teacher-list" v-if="show" @click.self="closeThis">
        <div class="list-content">
            <div class="search-input">
                <div style="margin-right:1rem;">
                    <el-input placeholder="请输入教师名称" v-model="teacherName"></el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <div style="margin-top:1rem;">
                <el-table
                    :data="list"
                    class="table"
                    ref="table"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column label="教师照片">
                        <template slot-scope="scope">
                            <img
                                :src="scope.row.photo"
                                style="width:50px;height:50px;object-fit:contain;"
                                alt="图片未加载"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="教师名称"></el-table-column>
                    <el-table-column prop="note" label="教师简介"></el-table-column>
                    <el-table-column label="选择">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="select(scope.$index, scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'teacherlist',
    props: {
        show: {
            type: Boolean,
            value: false
        }
    },
    data() {
        return {
            teacherName: '', //绑定搜索框值
            pageNum: 1, //当前页数
            pageSize: 10, //每页多少个
            list: [], //列表
            totalPage: 1 //最大页数
        };
    },
    created() {
        this.getList();
    },
    methods: {
        handleSearch() {
            this.getList();
        },
        closeThis() {
            this.$emit('close');
        },
        getList() {
            let query = {
                teacherName: this.teacherName,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            this.axios
                .get('/manager/teacherManagement/obtianTeacher', {
                    params: query
                })
                .then(res => {
                 
                    this.list = res.data.contents;
                    this.totalPage = res.data.page.pages;
                });
        },
        handleSelectionChange() {},
        select(index, item) {
            this.$emit('select', { id: item.id, name: item.name });
        }
    }
};
</script>

<style>
.teacher-list {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
}
.list-content {
    background-color: white;
    position: absolute;
    width: 700px;
    height: 500px;
    overflow: auto;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 10px;
}
.search-input {
    display: flex;
}
</style>