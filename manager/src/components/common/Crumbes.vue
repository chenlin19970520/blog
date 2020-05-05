<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-lx-calendar"/> {{title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  /**
   * @Description: 表头组件
   * 使用方法：
   *   父页面调用 'Crumbes': () => import('../../common/Crumbes'),
   *   父页面挂载 <Crumbes :title="'教师管理'"/>
   *   传值 :title= '页面title名'
   * @author Wish
   * @date 2019/12/3
  */
  export default {
    name: "Crumbes",
    props: {
      title: {
        type: String,
        default: () => ''
      }
    },
  }
</script>

<style scoped>

</style>
