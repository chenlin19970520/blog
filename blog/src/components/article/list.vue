<template>
  <div class="article_list">
    <div class="list-body">
      <div class="body-type">
        <div
          class="type-item"
          :class="type == 'NEWEST' ? ' type-active' : ''"
          @click="type = 'NEWEST'"
        >
          热门
        </div>
        <div
          class="type-item"
          :class="type == 'POPULAR' ? ' type-active' : ''"
          @click="type = 'POPULAR'"
        >
          最新
        </div>
      </div>
      <div class="body-list">
        <van-skeleton title :row="4" :loading="loading">
          <div class="body-detail" v-for="(item, index) in list" :key="index">
            <div class="detail-item">
              <div class="item-left">
                <div class="item-info">
                  <div class="item-label">专栏</div>
                  <div class="item-name">{{ item.nickname }}</div>
                  <div class="item-time">{{ item.creatTime | dateTime }}</div>
                  <div class="item-type">前端</div>
                </div>
                <div class="item-title" @click="lookItem(item)">
                  {{ item.title }}
                </div>
                <div class="item-content">
                  技术征文开启啦，快用你的面试经验换大奖 ~
                </div>
                <div class="item-opreating">
                  <div class="opreat-box">
                    <div class="box-like" @click="like(item,index)">
                      <img class="like" src="@/static/img/like.png" alt="" />
                      <span style="font-size:12px">{{item.articleLikeNumber}}</span>
                    </div>
                    <div class="box-comment">
                      <img
                        class="comment"
                        src="@/static/img/comment.png"
                        alt=""
                      />
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
        </van-skeleton>
      </div>
    </div>
    <div class="list-other"></div>
  </div>
</template>

<script>
import { Skeleton } from "vant";
export default {
  props: ["setting"],
  components: {
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      type: "POPULAR" /** POPULAR,NEWEST;最新,热门 */,
      pageSize: 20,
      pageNum: 0,
      list: [],
      url: "/web/user/article",
      getStatus: true, //获取数据是否可以
      loading: true,
    };
  },
  watch: {
    setting: {
      handler(val) {
        this.url = val.url || this.url;
        this.getArticleList();
      },
      deep: true,
      immediate: true,
    },
    type(val) {
      this.pageNum = 0;
      this.getArticleList();
    },
  },
  created() {
    let that = this;
    // this.getArticleList();
    window.addEventListener("scroll", function (e) {
      let scroll = window.scrollY;
      let windowHeight = window.innerHeight;
      let allHeight = document.body.scrollHeight;
      if (scroll + windowHeight >= allHeight - 100) {
        that.getArticleList();
      } else {
      }
    });
  },
  methods: {
    /**
     * @description:查看文章详情
     */
    lookItem(item) {
      // sessionStorage.setItem("blog_article_detail",JSON.stringify(item));
      // this.$router.push({
      //   path:"/articleDetail",
      // })
      let routeUrl = this.$router.resolve({
        path: "/articleDetail",
        query: {
          id: item.articleId,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    /**
     * @description:点赞文章
     */
    like(item,index){
      this.$axios.get("/web/home/articleLike",{
        articleId:item.articleId
      }).then(res=>{
        this.$func.toast(this.$createElement, "success", "提示", res)
        this.list[index].articleLikeNumber++;
        // this.list[index].articleLikeNumber
      })
    },
    /**
     * @description:获取文章列表
     * @author:chenlin
     * @time:2020-05-26
     */
    getArticleList() {
      if (!this.getStatus) {
        return;
      }
      let query = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type,
      };
      this.getStatus = false;

      this.$axios
        .get(this.url, query)
        .then((res) => {
          this.setStatus();
          if (res.content && res.content.length) {
            this.pageNum = this.pageNum + 1;
          }
          let list = JSON.parse(JSON.stringify(this.list));
          list = list.concat(res.content);
          this.list = list;
        })
        .catch((err) => {
          this.setStatus();
        });
    },
    /**
     * @desciprition:设置可以获取数据
     */
    setStatus() {
      this.loading = false;
      setTimeout(() => {
        this.getStatus = true;
      }, 500);
    },
  },
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
    .body-list {
      padding: 15px 0;
      box-sizing: border-box;
    }
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
        .item-content {
          font-size: 14px;
          color: #b2bac2;
        }
        .item-opreating {
          margin-top: 0.7rem;
          .opreat-box {
            border: 1px solid #eee;
            border-radius: 2px;
            display: inline-flex;
            align-items: center;
            height: 24px;
            img {
              width: 1rem;
              height: 1rem;
              margin-right: 4px;
            }
            .box-like,
            .box-comment {
              display: inline-flex;
              align-items: center;
              padding: 5px 7px;
              color: #b2bac2;
            }
          }
        }
        .item-title {
          font-size: 18px;
          line-height: 30px;
          font-weight: bold;
          margin-top: 5px;
          &:hover {
            color: rgba(9, 143, 167);
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
        cursor: pointer;
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