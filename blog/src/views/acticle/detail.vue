<template>
  <div class>
    <div class="header">
      <headerTop></headerTop>
    </div>
    <div class="detail-body">
        <div class="body-left">
            <div class="detail-top">
                <div>
                    <img class="avatar" :src="detail.avatar" alt="">
                </div>
                <div>
                    <div class="detail-name">{{detail.nickname}}</div>
                    <div class="detail-date">
                        <span>{{detail.createTime | changeDate}}</span>
                        <span>&nbsp;&nbsp;阅读 &nbsp;{{detail.reading?detail.reading:0}}</span>
                    </div>
                </div>
            </div>
            <div class="detail-title">{{detail.title}}</div>
            <div class="detail-content markdown-body" v-highlight v-html="detail.content"></div>
        </div>

    </div>
  </div>
</template>

<script>
import headerTop from "@/components/header/header.vue";

export default {
  components: {
    headerTop
  },
  created(){

  },
  destroyed(){
    sessionStorage.removeItem("blog_article_detail")
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    detail(){
        return sessionStorage.getItem("blog_article_detail")?JSON.parse(sessionStorage.getItem("blog_article_detail")):'';
    }
  }
};
</script>
<style lang="less" scoped>
.detail-body{
      max-width: 972px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
    .body-left{
        margin-top: 1.25rem;
        padding: 20px;
        box-sizing: border-box;
            width: 75%;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.005);
    .detail-title{
        font-size: 26px;
        text-align: left;
        font-weight: bold;
        margin: 2rem 0 ;
    }
    .detail-content{
        text-align: left;
    }
    .detail-top{
        display: flex;
        justify-content: flex-start;
        text-align: left;
        .detail-name{
            font-weight: bold;
        }
        .detail-date{
            font-size: 14px;
            color: #999;
            margin-top: 7px;
        }
    }
    .avatar{
        border-radius: 100%;
        width: 45px;
        height: 45px;
        display: block;
        object-fit: cover;
        margin-right: 15px;
    }
    }
}
</style>