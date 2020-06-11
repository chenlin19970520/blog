<template>
  <div class="comment">
    <div class="comment-title">评论</div>
    <div class="comment-list">
      <div class="send-box">
        <div class="input-line">
          <div class="send-img">
            <img class="send-avatar" :src="infoDetail.avatar" alt />
          </div>
          <div class="send-input">
            <el-input
              type="textarea"
              resize="none"
              @blur="commentBtnShow=commentValue?true:false"
              @focus="commentBtnShow=true"
              v-model="commentValue"
              :autosize="{
                          minRows:1
                      }"
              placeholder="请输入评论..."
            ></el-input>
          </div>
        </div>
        <div class="send-btn" v-if="commentBtnShow">
          <div></div>
          <div>
            <el-button
              @click="saveComment()"
              v-loading="commentLoading"
              :disabled="commentDisabled"
              :class="commentDisabled?'opacity-5':''"
              type="primary"
              size="small"
            >评论</el-button>
          </div>
        </div>
      </div>

      <div class="second-list">
        <div class="comment-item" v-for="(item,index) in commentList" :key="index">
          <div class="comment-info">
            <div class="info-img">
              <img class="info-avatar" :src="item.avatar" alt />
            </div>
            <div class="info-text">
              <div class="info-nickname">{{item.nickname}}(作者)</div>
              <div class="info-content">{{item.content}}</div>
              <div class="info-operat">
                <div class="info-time">
                  <span>{{item.time}}</span>
                  <span>删除</span>
                </div>
                <div class="operat-flex">
                  <div class="like">
                    <img class="like-img" src="@/static/img/love.png" alt />
                    <span>1</span>
                  </div>
                  <span class="reply" @click="replyComment(index)">回复</span>
                </div>
              </div>
              <div class="send-box" v-if="item.commentStatus" @mousedown="item.clickThis=true">
                <div class="input-line">
                  <!-- <div class="send-img">
                    <img class="send-avatar" :src="infoDetail.avatar" alt />
                  </div>-->
                  <div class="send-input">
                    <el-input
                      type="textarea"
                      resize="none"
                      v-model="item.commentValue"
                      @focus="item.clickThis=false"
                      @input="changeDisabled(index)"
                      @blur="item.commentStatus=item.clickThis,item.clickThis=!item.clickThis"
                      :autosize="{
                          minRows:1
                      }"
                      :placeholder="'回复'+item.nickname"
                    ></el-input>
                  </div>
                </div>
                <div class="send-btn">
                  <div></div>
                  <div>
                    <el-button
                      @click="saveReply(index)"
                      v-loading="item.commentLoading"
                      :disabled="item.commentDisabled"
                      :class="item.commentDisabled?'opacity-5':''"
                      type="primary"
                      size="small"
                    >回复</el-button>
                  </div>
                </div>
              </div>
              <div class="article-sub" v-if="item.subs&&item.subs.length">
                <div class="sub-item" v-for="(it,ix) in item.subs" :key="'sub'+ix">
                  <div class="info-img">
                    <img class="info-avatar" :src="it.avatar" alt />
                  </div>
                  <div class="info-text">
                    <div class="info-nickname">{{it.nickname}}(作者)</div>
                    <div class="info-content">{{it.content}}</div>
                    <div class="info-operat">
                      <div class="info-time">
                        <span>{{it.time}}</span>
                        <span>删除</span>
                      </div>
                      <div class="operat-flex">
                        <div class="like">
                          <img class="like-img" src="@/static/img/love.png" alt />
                          <span>1</span>
                        </div>
                        <!-- <span class="reply" @click="replyComment(index,ix)">回复</span> -->
                      </div>
                    </div>
                    <!-- <div
                      class="send-box scend-send-box"
                      v-if="it.commentStatus"
                      @mousedown="it.clickThis=true"
                    >
                      <div class="input-line">
                        <div class="send-input">
                          <el-input
                            type="textarea"
                            resize="none"
                            v-model="it.commentValue"
                            @focus="it.clickThis=false"
                            @input="changeDisabled(index,ix)"
                            @blur="it.commentStatus=it.clickThis,it.clickThis=!it.clickThis"
                            :autosize="{
                          minRows:1
                      }"
                            :placeholder="'回复'+it.nickname"
                          ></el-input>
                        </div>
                      </div>
                      <div class="send-btn">
                        <div></div>
                        <div>
                          <el-button
                            @click="secondSaveReplay(index,ix)"
                            v-loading="it.commentLoading"
                            :disabled="it.commentDisabled"
                            :class="it.commentDisabled?'opacity-5':''"
                            type="primary"
                            size="small"
                          >回复</el-button>
                        </div>
                      </div>
                    </div> -->
                    <div class="info-line second-line"></div>
                  </div>
                </div>
              </div>
              <div class="info-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentValue: "", //评论内容
      commentDisabled: true,
      commentLoading: false,
      commentBtnShow: false,
      pageNum: 0,
      commentList: []
    };
  },
  watch: {
    commentValue(val) {
      if (val) {
        this.commentDisabled = false;
      } else {
        this.commentDisabled = true;
      }
    }
  },
  computed: {
    infoDetail() {
      return this.$store.state.user.infoDetail;
    },
    detail() {
      return sessionStorage.getItem("blog_article_detail")
        ? JSON.parse(sessionStorage.getItem("blog_article_detail"))
        : "";
    }
  },
  created() {
    this.getCommentList();
  },
  methods: {
    /**
     * @description:回复评论
     */
    replyComment(index, ix) {
      if (ix || ix === 0) {
        this.commentList[index].subs[ix].commentStatus = !this.commentList[
          index
        ].subs[ix].commentStatus;
      } else {
        this.commentList[index].commentStatus = !this.commentList[index]
          .commentStatus;
      }
    },
    /**
     * @description:切换回复按钮状态
     */
    changeDisabled(index, ix) {
      if (ix || ix === 0) {
        this.commentList[index].subs[ix].commentDisabled = this.commentList[
          index
        ].subs[ix].commentValue
          ? false
          : true;
      } else {
        this.commentList[index].commentDisabled = this.commentList[index]
          .commentValue
          ? false
          : true;
      }
    },
    /**
     * @description:二级保存发布回复
     */
    secondSaveReplay(index, ix) {
      let item = this.commentList[index];
      let query = {
        articleId: this.detail.articleId,
        content: item.commentValue,
        toCommentId: item.id
      };
      this.commentList[index].subs[ix].commentLoading = true;
      this.$axios
        .post("/web/user/comment", query)
        .then(res => {
          this.commentList[index].subs[ix].commentLoading = false;
          this.commentList[index].subs[ix].commentStatus = false;
          this.commentList[index].subs[ix].commentValue = "";
          this.commentList[index].subs[ix].clickThis = false;
          this.$func.toast(this.$createElement, "success", "提示", "回复成功");
          this.getCommentList();
        })
        .catch(err => {
          this.commentList[index].subs[ix].commentLoading = false;
          this.$func.toast(this.$createElement, "error", "错误", err);
        });
    },
    /**
     * @description:保存发布回复
     */
    saveReply(index) {
      let item = this.commentList[index];
      let query = {
        articleId: this.detail.articleId,
        content: item.commentValue,
        toCommentId: item.id
      };
      this.commentList[index].commentLoading = true;
      this.$axios
        .post("/web/user/comment", query)
        .then(res => {
          this.commentList[index].commentLoading = false;
          this.commentList[index].commentStatus = false;
          this.commentList[index].commentValue = "";
          this.commentList[index].clickThis = false;
          this.$func.toast(this.$createElement, "success", "提示", "回复成功");
          this.getCommentList();
        })
        .catch(err => {
          this.commentList[index].commentLoading = false;
          this.$func.toast(this.$createElement, "error", "错误", err);
        });
    },
    /**
     * @description:保存发布评论
     */
    saveComment(id) {
      let query = {
        articleId: this.detail.articleId,
        content: this.commentValue,
        toCommentId: id ? id : 0
        //   userId:infoDetail.userId
      };
      this.commentLoading = true;
      this.$axios
        .post("/web/user/comment", query)
        .then(res => {
          this.commentLoading = false;
          this.commentValue = "";
          this.$func.toast(this.$createElement, "success", "提示", "评论成功");
          this.getCommentList();
        })
        .catch(err => {
          this.commentLoading = false;
          this.$func.toast(this.$createElement, "error", "错误", err);
        });
    },
    /**
     * @description:获取评论列表
     */
    getCommentList() {
      let query = {
        articleId: this.detail.articleId,
        pageNum: this.pageNum,
        pageSize: 10
      };
      this.$axios.get("/web/home/comment", query).then(res => {
        let item = {
          commentStatus: false,
          commentValue: "",
          commentLoading: false,
          commentDisabled: true,
          clickThis: false
        };
        let list = res.contents.map(it => {
          it.subs = it.subs.map(sub => {
            return {
              ...item,
              ...sub
            };
          });
          let k = {
            ...item,
            ...it
          };
          return k;
        });
        this.commentList = list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.opacity-5 {
  opacity: 0.5;
}
/deep/.el-textarea__inner:focus {
  border-color: #098fa4;
}
.comment {
  .comment-title {
  }
  .comment-list {
    margin: 2rem 0;
    .send-box {
      background-color: #fafbfc;
      padding: 1rem;
      box-sizing: border-box;
      .input-line {
        display: flex;
        align-items: flex-start;
      }
      .send-img {
        margin-right: 1rem;
        .send-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
          object-fit: cover;
        }
      }
      .send-input {
        flex: 1;
        /deep/.el-textarea__inner {
          padding: 9px 15px;
        }
      }
      .send-btn {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .scend-send-box {
      background-color: white;
      border: 1px solid #f1f1f1;
      border-bottom: 0px;
    }
    .article-sub {
      background-color: #fafbfc;
      margin-top: 1rem;
      padding: 1rem 1rem 0rem 1rem;
      box-sizing: border-box;
      .sub-item {
        display: flex;
        align-items: flex-start;
        text-align: left;
        .second-line {
          margin-top: 0rem !important;
          margin-bottom: 1rem;
        }
      }
    }
    .second-list {
      padding-left: 4rem;
      .comment-item {
        margin-top: 1rem;
        .comment-info {
          display: flex;
          align-items: flex-start;
          text-align: left;
        }
        .info-avatar {
          width: 2rem;
          height: 2rem;
          object-fit: cover;
          border-radius: 100%;
        }
        .info-text {
          margin-left: 1rem;
          width: 100%;
          .info-nickname {
            font-size: 14px;
          }
          .info-content {
            font-size: 14px;
            width: 100%;
            line-height: 20px;
            margin-top: 0.5rem;
            white-space: pre-wrap;
            word-break: break-all;
          }
          .info-time {
            color: #8a9aa9;
            font-size: 12px;
            margin-top: 0.5rem;
          }
          .info-line {
            width: 100%;
            height: 1px;
            background-color: #f1f1f1;
            margin-top: 1rem;
          }
          .info-operat {
            display: flex;
            justify-content: space-between;
          }
          .operat-flex {
            display: flex;
            font-size: 14px;
            align-items: center;
            margin-bottom: 1rem;
            .like-img {
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-right: 5px;
            }
            .like {
              display: flex;
              align-items: center;
              margin-right: 50px;
            }
            .reply {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>