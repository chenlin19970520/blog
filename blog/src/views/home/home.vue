<template>
  <div class="home" >
    <div class="header">
      <headerTop></headerTop>
      <div class="mt-1">
        <labelHeader></labelHeader>
      </div>
      <div class="list-box">
        <articleList></articleList>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";
import labelHeader from "@/components/label/labelHeader.vue";
import articleList from "@/components/article/list.vue";
export default {
  components: {
    headerTop,
    labelHeader,
    articleList
  },
  methods:{
    load(){}
  }
};
</script>

<style lang="less" scoped>
.mt-1 {
  margin-top: 2px;
}
.list-box {
  background-color: #efefef;
  padding-top: 1.25rem;
}
</style>