<template>
    <el-pagination
        background
        class="pagination_box"
        layout="total, prev, pager, next,jumper"
        @current-change="handleCurrentChange"
        :page-size="data.pageable?data.pageable.pageSize:10"
        :current-page="(data&&data.pageable?data.pageable.pageNumber:1)"
        :total="data.totalElements"
    >
    </el-pagination>
</template>

<script>
/**
 * @Description: 分页器组件
 * 使用方法：
 *   父页面：
 *     引用 'Pagination': () => import('../../common/Pagination')
 *     挂载 <Pagination @currentChange="currentChange" :data="paginationData"/>
 *     传值 :data= '分页数据'
 *     方法 @currentChange= '方法名'
 *     使用 currentChange(pageNum){
 *           this.pageNumber = pageNum  // 当前页码赋值
 *           this.getData() // 重新调用页面数据
 *          },
 */
export default {
    name: 'Pagination',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('currentChange', val);
        }
    }
};
</script>

<style scoped>
.pagination_box {
    margin-top: 15px;
    text-align: right;
}
</style>
