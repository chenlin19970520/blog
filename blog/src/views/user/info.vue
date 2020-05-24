<template>
  <div class="user-center">
    <div class="header">
      <headerTop></headerTop>
    </div>
          <div class="list-box">

      </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";
export default {
  components: {
    headerTop
  }
};
</script>

<style lang="less" scoped>
.user-center{
  background-color: #efefef;

}
.list-box {
  background-color: #efefef;
  padding-top: 3rem;
}
</style>