<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {

        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>