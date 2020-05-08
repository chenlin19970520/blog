<template>
  <div class="login">
    <img class="login_bg" src="@/static/img/login_bg.jpg" alt />
    <div class="login-modal">
      <div class="form-modal" v-if="isLogin">
        <div class="tab-menu">
          <div
            class="tab-item"
            @click="changeTab('phone')"
            :class="tabActive=='phone'?'tab-active':''"
          >手机号登录</div>
          <div
            class="tab-item"
            @click="changeTab('password')"
            :class="tabActive=='password'?'tab-active':''"
          >密码登录</div>
        </div>
        <div
          class="input-line"
          v-if="tabActive=='phone'"
          :class="className.indexOf('username')!=-1?'active':''"
        >
          <el-input
            placeholder="请输入手机号"
            @focus="addClass('username')"
            clearable
            v-model="loginInfo.username"
            @blur="addClass('username')"
          ></el-input>
          <div class="bottom-line">
            <div class="active-line"></div>
          </div>
        </div>
        <div
          class="input-line"
          v-if="tabActive!='phone'"
          :class="className.indexOf('username')!=-1?'active':''"
        >
          <el-input
            placeholder="请输入用户名"
            @focus="addClass('username')"
            clearable
            v-model="loginInfo.username"
            @blur="addClass('username')"
          ></el-input>
          <div class="bottom-line">
            <div class="active-line"></div>
          </div>
        </div>
        <div
          class="input-line"
          v-if="tabActive!='phone'"
          :class="className.indexOf('password')!=-1?'active':''"
        >
          <div class="flex-row">
            <el-input
              class="flex-one"
              placeholder="请输入密码"
              clearable
              @focus="addClass('password')"
              v-model="loginInfo.password"
              @blur="addClass('password')"
            ></el-input>

            <img src alt />
          </div>
          <div class="bottom-line">
            <div class="active-line"></div>
          </div>
        </div>

        <div class="input-line">
          <el-button
            class="login-btn mt-2"
            v-loading="loginLoading"
            @click="login"
            type="primary"
          >登录</el-button>
        </div>
        <div class="input-line">
          <el-button
            class="login-btn"
            v-loading="loginLoading"
            type="primary"
            @click="isRegister=true,isLogin=false"
          >没有账号？去注册</el-button>
        </div>
        <div class="input-line">
          <div class="other-login flex-row flex-between">
            <div>社交账号登录</div>
          </div>
        </div>
      </div>
      <!-- 注册弹窗 -->
      <div class="register-modal" v-if="isRegister">
        <div class="split-line"></div>
        <div class="flex-row flex-between">
          <div class="w-45">
            <div class="input-line">
              <div class="register-avatar">
                <el-upload
                  class="avatar-uploader"
                  action="/other/uploadFile"
                  :data="{
                    type:1
                  }"
                  v-loading="upload.face"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessFace"
                  :before-upload="beforeAvatarUploadFace"
                >
                  <img
                    :src="registerInfo.face?'/'+registerInfo.face:require('@/static/img/avatar_male.png')"
                    alt
                  />
                  <div class="text">点击上传本人照片</div>
                </el-upload>
              </div>
            </div>
            <div class="mt-2"></div>
            <div
              class="input-line"
              :class="registerClassName.indexOf('actualName')!=-1?'active':''"
            >
              <el-input
                placeholder="请输入真实姓名"
                @focus="addRegisterClass('actualName')"
                clearable
                v-model="registerInfo.actualName"
                @blur="addRegisterClass('actualName')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('idNumber')!=-1?'active':''">
              <el-input
                placeholder="请输入身份证号"
                @focus="addRegisterClass('idNumber')"
                clearable
                v-model="registerInfo.idNumber"
                @blur="addRegisterClass('idNumber')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('gender')!=-1?'active':''">
              <el-select
                placeholder="请选择性别"
                clearable
                v-model="registerInfo.gender"
                @focus="addRegisterClass('gender')"
                @blur="addRegisterClass('gender')"
              >
                <el-option
                  v-for="(item,index) in sexList"
                  :key="index"
                  :label="item.name"
                  :value="item.key"
                ></el-option>
              </el-select>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('birthday')!=-1?'active':''">
              <el-date-picker
                v-model="registerInfo.birthday"
                placeholder="请选择出生日期"
                value-format="yyyy-MM-dd"
                clearable
                @focus="addRegisterClass('birthday')"
                @blur="addRegisterClass('birthday')"
                type="date"
              ></el-date-picker>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="mt-2"></div>
            <div class="input-line flex-row flex-between">
              <div class="idcard-positive">
                <el-upload
                  class="avatar-uploader"
                  action="/other/uploadFile"
                  :data="{
                    type:1
                  }"
                  v-loading="upload.idNumberPhoto"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessIdNumber"
                  :before-upload="beforeAvatarUploadIdNumber"
                >
                  <img
                    v-if="registerInfo.idNumberPhoto"
                    :src="'/'+registerInfo.idNumberPhoto"
                    class="avatar"
                  />
                  <div v-else class="idcard-text">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <span>身份证照片</span>
                  </div>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="w-45">
            <div class="input-line">
              <div class="register-avatar">
                <el-upload
                  class="avatar-uploader"
                  action="/other/uploadFile"
                  :data="{
                    type:1
                  }"
                  v-loading="upload.avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessAvatar"
                  :before-upload="beforeAvatarUploadAvatar"
                >
                  <img v-if="registerInfo.avatar" :src="'/'+registerInfo.avatar" alt />
                  <img v-else src="@/static/img/avatar_famale.png" alt />
                  <div class="text">点击上传用户头像</div>
                </el-upload>
              </div>
            </div>
            <div class="mt-2"></div>
            <div class="input-line" :class="registerClassName.indexOf('nickname')!=-1?'active':''">
              <el-input
                placeholder="请输入昵称"
                @focus="addRegisterClass('nickname')"
                clearable
                v-model="registerInfo.nickname"
                @blur="addRegisterClass('nickname')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('username')!=-1?'active':''">
              <el-input
                placeholder="请输入用户名"
                @focus="addRegisterClass('username')"
                clearable
                v-model="registerInfo.username"
                @blur="addRegisterClass('username')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('password')!=-1?'active':''">
              <el-input
                placeholder="请输入登录密码"
                @focus="addRegisterClass('password')"
                clearable
                v-model="registerInfo.password"
                @blur="addRegisterClass('password')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('phone')!=-1?'active':''">
              <el-input
                placeholder="请输入手机号"
                @focus="addRegisterClass('phone')"
                clearable
                v-model="registerInfo.phone"
                @blur="addRegisterClass('phone')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
            <div class="input-line" :class="registerClassName.indexOf('mailbox')!=-1?'active':''">
              <el-input
                placeholder="请输入邮箱"
                @focus="addRegisterClass('mailbox')"
                clearable
                v-model="registerInfo.mailbox"
                @blur="addRegisterClass('mailbox')"
              ></el-input>
              <div class="bottom-line">
                <div class="active-line"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2"></div>
        <div class="input-line flex-row flex-center">
          <div class="register-btn">
            <el-button class="login-btn" @click="register" v-loading="registerLoading">保存信息并注册</el-button>
          </div>
          <div class="register-btn">
            <el-button
              class="login-btn"
              v-loading="registerLoading"
              @click="isLogin=true,isRegister=false"
            >已有账号？去登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5"
export default {
  components: {},
  data() {
    return {
      registerInfo: {
        actualName: "", //真实姓名
        birthday: "", //出生日期
        face: "", //本人照片
        gender: "", //性别
        avatar: "", //头像
        nickname: "", //昵称
        username: "", //用户名
        password: "", //用户密码
        phone: "", //手机号,
        mailbox: "", //邮箱,
        idNumber: "", //身份证号
        idNumberPhoto: "" //身份证照片
      },
      upload: {
        avatar: false,
        face: false,
        idNumberPhoto: false
      },
      sexList: [
        {
          name: "男",
          key: "MALE"
        },
        {
          name: "女",
          key: "FEMALE"
        }
      ],
      loginInfo: {
        username: "",
        password:""
      }, //登录信息
      isLogin: true, //是否是登录
      isRegister: false, //是否是注册
      loginLoading: false, //登录loading
      registerLoading: false, //注册loading
      tabActive: "password", //登录方式
      className: "", //input框选中
      registerClassName: "" //注册框
    };
  },
  methods: {
    /**
     * @description:添加login的className
     */
    addClass(name) {
      if (this.className.indexOf(name) == -1) {
        this.className = this.className + name;
      } else {
        this.className = this.className.replace(name, "");
      }
    },
    /**
     * @description:添加register的className
     */
    addRegisterClass(name) {
      if (this.registerClassName.indexOf(name) == -1) {
        this.registerClassName = this.registerClassName + name;
      } else {
        this.registerClassName = this.registerClassName.replace(name, "");
      }
    },
    /**
     * @description:切换tab
     */
    changeTab(name) {
      // this.tabActive = name;
      this.tabActive = "password";
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
      this.upload[name] = true;
      return isJPG && isLt2M;
    },
    /**
     * @description:身份证上传之前
     */
    beforeAvatarUploadIdNumber(file) {
      return this.beforeAvatarUpload(file, "idNumberPhoto");
    },
    /**
     * @description:头像上传之前
     */
    beforeAvatarUploadAvatar(file) {
      return this.beforeAvatarUpload(file, "avatar");
    },
    /**
     * @description:本人照片上传之前
     */
    beforeAvatarUploadFace(file) {
      return this.beforeAvatarUpload(file, "face");
    },

    /**
     * @description:上传成功
     */
    handleAvatarSuccess(res, file, name) {
      this.upload[name] = false;
      this.registerInfo[name] = res.data;
      this.registerInfo = Object.assign({}, this.registerInfo);
    },
    handleAvatarSuccessFace(res, file) {
      this.handleAvatarSuccess(res, file, "face");
    },
    handleAvatarSuccessAvatar(res, file) {
      this.handleAvatarSuccess(res, file, "avatar");
    },
    handleAvatarSuccessIdNumber(res, file) {
      this.handleAvatarSuccess(res, file, "idNumberPhoto");
    },

    beforeRegister() {
      let info = this.registerInfo;
      let waring = "";
      for (let k in info) {
        if (!info[k]) {
          waring = true;
        }
      }
      if (waring) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "注册时，请输入完整的信息！"
        );
        return false;
      }
      if (!this.$filter.phone(info.phone)) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入正确的手机号码"
        );
        return false;
      }
      if (!this.$filter.idNumber(info.idNumber)) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入正确的身份证号"
        );
        return false;
      }
      if (!this.$filter.email(info.mailbox)) {
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入正确的邮箱"
        );
        return false;
      }
      return true;
    },
    /**
     * 去注册
     */
    register() {
      if (!this.beforeRegister()) {
        return;
      }
      let query = {
        ...this.registerInfo
      };
      this.registerLoading = true;
      this.$axios
        .post("/web/registered", query)
        .then(res => {
          this.registerLoading = false;
          this.$func.toast(
            this.$createElement,
            "success",
            "提示",
            "注册成功，快去登录吧！"
          );
          this.isRegister = false;
          this.isLogin = true;
        })
        .catch(err => {
          this.registerLoading = false;
          this.$func.toast(
          this.$createElement,
          "error",
          "错误",
          err
        );
        });
    },
    /**
     * @description:登录
     */
    login(){
      if(!this.loginInfo.username || !this.loginInfo.password){
        this.$func.toast(
          this.$createElement,
          "warning",
          "提示",
          "请输入用户名或密码！"
        );
        return
      }
      let query = {
        username:this.loginInfo.username,
        password:md5(this.loginInfo.password)
      }
      this.loginLoading = true;
      this.$axios.get("/web/login",query).then(
        (res)=>{
          this.loginLoading = false;
          this.$func.toast(
          this.$createElement,
          "success",
          "提示",
          "登录成功")
        }
      ).catch(err=>{
        this.loginLoading = false;
        this.$func.toast(
          this.$createElement,
          "error",
          "错误",
          err)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.flex-row {
  display: flex;
}
.flex-center {
  justify-content: center;
}
.flex-between {
  justify-content: space-between;
}
.flex-one {
  flex: 1;
}
.mt-2 {
  margin-top: 2rem;
}
.w-45 {
  width: 45%;
}
@keyframes show {
  0% {
    opacity: 0;
    transform: translateX(-3rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}
.login {
  width: 100vw;
  height: 100vh;
  .login_bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .login-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .register-modal {
      width: 1000px;
      min-width: 1000px;
      height: 680px;
      border-radius: 2px;
      background-color: white;
      padding: 1rem;
      box-sizing: border-box;
      animation: show 0.15s ease-in-out;
      position: relative;
      .split-line {
        position: absolute;
        top: 50px;
        left: 50%;
        width: 1px;
        height: 500px;
        background-color: #dcdfe6;
      }
      .register-btn {
        width: 200px;
        margin: 0 1rem;
        /deep/.el-button {
          color: white;
        }
      }
      .idcard-positive,
      .idcard-back {
        width: 309px;
        margin: 0 auto;
        height: 150px;
        border: 1px solid rgba(9, 143, 167, 0.5);
        border-radius: 2px;
        overflow: hidden;
        .idcard-text {
          font-size: 14px;
          color: rgba(9, 143, 167, 0.5);
        }
        cursor: pointer;
        /deep/.avatar-uploader {
          width: 100%;
          height: 100%;
          line-height: 150px;
          .avatar {
            width: 100%;
            height: 100%;
          }
          .el-upload {
            width: 100%;
            height: 100%;
          }
        }
      }
      .register-avatar {
        text-align: center;
        img {
          width: 4rem;
          height: 4rem;
          margin: 0 auto;
          border-radius: 50%;
          object-fit: cover;
        }
        .text {
          font-size: 14px;
          margin-top: 0.5rem;
          color: rgba(9, 143, 167);
        }
      }
      /deep/.el-input__inner {
        text-align: center;
      }
    }
    .input-line {
      margin-top: 1rem;
    }
    /deep/.el-select {
      width: 100%;
    }
    /deep/.el-input__inner {
      border: none;
      padding: 0;
    }
    /deep/.el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .login-btn {
      background-color: rgba(9, 143, 167);
      border: none;
      width: 100%;
    }

    .active {
      .bottom-line {
        background-color: transparent;
        .active-line {
          width: 100%;
        }
      }
    }
    .bottom-line {
      width: 100%;
      background-color: #dcdfe6;
      height: 1px;
      .active-line {
        width: 0px;
        height: 1px;
        margin: 0 auto;
        background-color: rgba(9, 143, 167);
        transition: all 0.25s ease-in-out;
      }
    }
    .form-modal {
      width: 400px;
      height: 500px;
      border-radius: 2px;
      background-color: white;
      padding: 1rem;
      box-sizing: border-box;
      animation: show 0.15s ease-in-out;
      .tab-menu {
        display: flex;
        margin: 2rem 0;
        .tab-item {
          margin-right: 20px;
          color: #333;
          cursor: pointer;
          font-weight: bold;
        }
        .tab-active {
          color: rgba(9, 143, 167);
        }
      }

      .other-login {
        font-size: 14px;
        padding-top: 2rem;
        margin-top: 2rem;
        box-sizing: border-box;
        border-top: 1px solid #dcdfe6;
      }
    }
  }
}
</style>