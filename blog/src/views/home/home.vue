<template>
  <div class="home">
    <div class="header">
      <headerTop></headerTop>
      <div class="mt-1">
        <labelHeader></labelHeader>
      </div>
      <div class="list-box">
          <articleList :setting="setting" ></articleList>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";
import labelHeader from "@/components/label/labelHeader.vue";
import articleList from "@/components/article/list.vue";
import zingtouch from "zingtouch";
import test from "../../api/test.js";
export default {
  components: {
    headerTop,
    labelHeader,
    articleList,
  },
  data(){
    return{
      setting:{
        url:"/web/home/article",
        filter:""
      }
    }
  },
  methods: {
    load() {},
  },
  mounted() {
    let t = test();
    console.log(t);
  },
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
.box {
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
}
</style>