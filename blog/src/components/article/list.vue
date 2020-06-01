<template>
  <div class="article_list"  >
    <div class="list-body">
      <div class="body-type">
        <div class="type-item type-active">热门</div>
        <div class="type-item">最新</div>
      </div>
      <div class="body-detail" v-for="(item,index) in list" :key="index">
        <div class="detail-item">
          <div class="item-left">
            <div class="item-info">
              <div class="item-label">专栏</div>
              <div class="item-name" >{{item.nickname}}</div>
              <div class="item-time">{{item.creatTime|dateTime}}</div>
              <div class="item-type">前端</div>
            </div>
            <div
              class="item-title"
              @click="lookItem(item)"
            >{{item.title}}</div>
            <div class="item-content">掘金技术征文开启啦，快用你的面试经验换大奖 ~</div>
            <div class="item-opreating">
              <div class="opreat-box">
                <div class="box-like">
                  <img class="like" src="@/static/img/like.png" alt="">
                  <span>11</span>
                </div>
                <div class="box-comment">
                  <img class="comment" src="@/static/img/comment.png" alt="">
                  <span>11</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <img src="@/static/img/login_bg.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="list-other">dd</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pageSize:20,
      pageNum:0,
      list:[],
      getStatus:true,//获取数据是否可以
    }
  },
  created(){
    let that =this;
    this.getArticleList();
    window.addEventListener("scroll",function(e){
      let scroll = window.scrollY;
      let windowHeight = window.innerHeight;
      let allHeight = document.body.scrollHeight;
      if(scroll+windowHeight>=allHeight-100){
        that.pageNum = that.pageNum + 1;
        that.getArticleList();
      }
     else{
       
     }
    })
  },
  methods:{
    /**
     * @description:查看文章详情
     */
    lookItem(item){
      sessionStorage.setItem("blog_article_detail",JSON.stringify(item));
      // this.$router.push({
      //   path:"/articleDetail",
      // })
      let routeUrl = this.$router.resolve({
        path:"/articleDetail",
      })
      window.open(routeUrl.href,"_blank")
    },
    /**
     * @description:获取文章列表
     * @author:chenlin
     * @time:2020-05-26
     */
    getArticleList(){
      if(!this.getStatus){
        return;
      }
      let query = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
      }
      this.getStatus =false;
      this.$axios.get("/web/user/article",query).then(
        (res)=>{
          this.setStatus();
          if(!res.content||!res.content.length){
            this.pageNum = this.pageNum - 1;
            
          }
          let list = JSON.parse(JSON.stringify(
            this.list
          ))
          list = list.concat(res.content);
          this.list = list;          
        }
      ).catch(err=>{
        this.setStatus();
      })
    },
    /**
     * @desciprition:设置可以获取数据
     */
    setStatus(){
      setTimeout(()=>{
        this.getStatus = true
      },500)
    }
  }
};
</script>
<style lang="less" scoped>
.article_list {
  max-width: 972px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .list-body {
    width: 75%;
    background-color: white;
    font-size: 14px;
    .body-detail {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 20px;
      box-sizing: border-box;
      .detail-item {
        text-align: left;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        cursor: pointer;
        .item-content,
        .item-title {
          overflow: hidden;
          margin-top: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
        .item-content{
          font-size: 14px;
           color: #b2bac2;
        }
        .item-opreating{
          margin-top: .7rem;
          .opreat-box{
            border: 1px solid #eee;
            border-radius: 2px;
            display: inline-flex;
            align-items: center;
            height: 24px;
            img{
               width: 1rem;
                height: 1rem;
                margin-right: 4px;
            }
            .box-like,.box-comment{
              display: inline-flex;
              align-items: center;
              padding: 5px 7px;
              color:#b2bac2 ;
            }
          }
        }
        .item-title {
          font-size: 18px;
          line-height: 30px;
          font-weight: bold;
          margin-top: 5px;
          &:hover{
            color:rgba(9, 143, 167);
            text-decoration: underline;
          }
        }
        .item-left {
          width: calc(100% - 6rem);
          margin-right: 1rem;
        }
        .item-right {
          img {
            width: 4.5rem;
            height: 4.5rem;
            display: block;
            object-fit: cover;
            border-radius: 2px;
          }
        }
        .item-info {
          display: flex;
          color: #b2bac2;
          font-size: 12px;
          .item-label {
            color: plum;
          }
          div {
            &:not(:first-of-type) {
              padding-left: 16px;
              position: relative;
              &:before {
                content: "";
                width: 2px;
                height: 2px;
                border-radius: 100%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 8px;
                background-color: #999;
              }
            }
          }
        }
      }
    }
    .body-type {
      display: flex;
      padding: 10px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      .type-active {
        color: #007fff !important;
      }
      .type-item {
        margin-right: 30px;
        color: #999;
        &:not(:last-of-type) {
          position: relative;
          &:after {
            content: "";
            width: 1px;
            height: 80%;
            background-color: rgba(0, 0, 0, 0.05);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -15px;
          }
        }
      }
    }
  }
  .list-other {
    width: 20%;
  }
}
</style>