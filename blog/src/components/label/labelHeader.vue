<template>
  <div class="label-header">
    <div class="body">
      <div class="label-list">
        <div class="label-item" v-for="(item,index) in labelList" :key="index">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelList: [
        {
          name: "推荐"
        },
        {
          name: "前端"
        },
        {
          name: "后端"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.label-header{
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    .body{
        width: 972px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label-list{
            display: flex;
            align-items: center;
            font-size: 14px;
             color: #999;
            .label-item{
                margin-right: 20px;
                height: 45px;
                line-height: 45px;
                 &:hover{
                        color: #007fff;
                        cursor: pointer;
                    }
                
            }
        }
    }
}
</style>