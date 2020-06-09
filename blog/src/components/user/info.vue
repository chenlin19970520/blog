<template>
  <div class="user-info">
    <div class="info-title">个人资料</div>
    <div class="setting-list">
      <div class="set-item set-item-two">
        <div class="set-title">头像</div>
        <div class="set-input">
          <div class="avatar">
            <img :src="editUser.avatar" alt />
          </div>
          <div>
            <div class="upload-caption">支持jpg、png格式大小5M以内的图片</div>
            <div class="upload-btn">
              <el-upload
                action="/other/uploadFile"
                :data="{type:1}"
                v-loading="uploadingAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccessAvatar"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="primary" size="small">上传图片</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="set-opeat"></div>
      </div>
      <div class="set-item">
        <div class="set-title">昵称</div>
        <div class="set-input">
          <el-input
            id="nicknameInput"
            v-model="editUser.nickname"
            @blur="inputBlur('nickname')"
            @focus="inputFocus('nickname')"
          ></el-input>
        </div>
        <div class="set-opeat">
          <div class="opeat-row" v-if="!showEdit.nickname" @click="setInputFocus('nickname')">
            <img class="ico" src="@/static/img/pen.png" alt />
            <span>修改</span>
          </div>
          <div class="opeat-row" v-if="showEdit.nickname">
            <div class="save" @mousedown="saveEdit('nickname')">保存</div>
            <div class="cancel">取消</div>
          </div>
        </div>
      </div>
      <div class="set-item">
        <div class="set-title">手机号</div>
        <div class="set-input">
          <el-input
            id="phoneInput"
            v-model="editUser.phone"
            @blur="inputBlur('phone')"
            @focus="inputFocus('phone')"
          ></el-input>
        </div>
        <div class="set-opeat">
          <div class="opeat-row" v-if="!showEdit.phone" @click="setInputFocus('phone')">
            <img class="ico" src="@/static/img/pen.png" alt />
            <span>修改</span>
          </div>
          <div class="opeat-row" v-if="showEdit.phone">
            <div class="save" @mousedown="saveEdit('phone')">保存</div>
            <div class="cancel">取消</div>
          </div>
        </div>
      </div>
      <div class="set-item">
        <div class="set-title">邮箱</div>
        <div class="set-input">
          <el-input
            id="mailboxInput"
            v-model="editUser.mailbox"
            @blur="inputBlur('mailbox')"
            @focus="inputFocus('mailbox')"
          ></el-input>
        </div>
        <div class="set-opeat">
          <div class="opeat-row" v-if="!showEdit.mailbox" @click="setInputFocus('mailbox')">
            <img class="ico" src="@/static/img/pen.png" alt />
            <span>修改</span>
          </div>
          <div class="opeat-row" v-if="showEdit.mailbox">
            <div class="save" @mousedown="saveEdit('mailbox')">保存</div>
            <div class="cancel">取消</div>
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
      editUser: {}, //修改资料
      showEdit: {
        nickname: false,
        mailbox: false,
        phone: false
      },
      uploadingAvatar: false //上传头像loading
    };
  },
  created() {
    this.editUser = Object.assign({}, this.$store.state.user.infoDetail);
  },
  computed: {
    user() {
      return this.$store.state.user.userInfo;
    },
    userDetail() {
      return this.$store.state.user.infoDetail;
    }
  },
  methods: {
    /**
     * @description:保存修改
     */
    saveEdit(key) {
      console.log(key);
      let query = {
        ...this.userDetail
      };
      query[key] = this.editUser[key];
      this.$axios.post("/web/user/modify", query).then(res => {
        this.$func.toast(this.$createElement, "success", "提示", "修改成功");
        this.$func.setCookie("blogInfoDetail", query);
        this.$store.dispatch("user/modifyUserInfoDetail", query);
      });
    },
    /**
     * @description:点击修改
     */
    setInputFocus(k) {
      let key = k + "Input";
      let inputItem = document.getElementById(key);
      inputItem.focus();
      // inputItem.select();
    },
    /**
     * @description:输入框失去焦点事件
     */
    inputBlur(key) {
      this.showEdit[key] = false;
      this.showEdit = Object.assign({}, this.showEdit);
    },
    /**
     * @description:输入框获取焦点事件
     */
    inputFocus(key) {
      this.showEdit[key] = true;
      this.showEdit = Object.assign({}, this.showEdit);
    },
    /**
     * @description:上传图片之前
     */
    beforeAvatarUpload(file, name) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$func.toast(
          this.$createElement,
          "error",
          "错误",
          "上传图片只能是 JPG/PNG 格式!"
        );
        return false;
      }
      if (!isLt2M) {
        this.$func.toast(
          this.$createElement,
          "error",
          "错误",
          "上传图片不能超过2M!"
        );
        return false;
      }
      this.uploadingAvatar = true;
      return isJPG && isLt2M;
    },
    /**
     * @description:上传成功
     */
    handleAvatarSuccessAvatar(res, file) {
      this.editUser.avatar = res.data;
      this.uploadingAvatar = false;
      this.saveEdit('avatar')
    }
  }
};
</script>

<style lang="less" scoped>
.user-info {
  background-color: white;
  padding: 2.5rem;
  box-sizing: border-box;
  .info-title {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .setting-list {
    .set-item {
      border-top: 1px solid #f1f1f1;
      padding: 1rem 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .set-title {
        width: 20%;
        text-align: left;
        font-size: 14px;
      }
      .set-input {
        width: 65%;
        display: flex;
        /deep/.el-input__inner {
          border: none;
          padding: 0;
          font-size: 14px;
        }
        .upload-caption {
          font-size: 13px;
          color: #999;
        }
        .upload-btn {
          text-align: left;
          margin-top: 1rem;
        }
        .avatar {
          width: 72px;
          height: 72px;
          margin-right: 30px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .set-opeat {
        width: 15%;
        .opeat-row {
          display: flex;
          font-size: 14px;
          color: #098fa4;
          justify-content: flex-end;
          cursor: pointer;
          .cancel {
            color: #666;
            margin-left: 10px;
          }
        }
        .ico {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
    .set-item-two {
      padding: 1rem 0;
    }
  }
}
</style>