<template>
  <div class="login">
    <img class="login_bg" src="@/static/img/login_bg.jpg" alt />
    <div class="login-modal">
      <div class="form-modal">
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
        <div class="input-line" :class="className.indexOf('username')!=-1?'active':''">
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
        <div class="input-line" :class="className.indexOf('username')!=-1?'active':''">
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
        <div class="input-line" :class="className.indexOf('password')!=-1?'active':''">
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
          <el-button class="login-btn" v-loading="loginLoading" type="primary">登录</el-button>
        </div>
        <div class="input-line">
          <div class="other-login flex-row flex-between">
            <div>社交账号登录</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginInfo: {
        username: ""
      },
      loginLoading: false, //登录loading
      tabActive: "phone",
      className: "" //input框选中
    };
  },
  methods: {
    /**
     * @description:添加className
     */
    addClass(name) {
      if (this.className.indexOf(name) == -1) {
        this.className = this.className + name;
      } else {
        this.className = this.className.replace(name, "");
      }
    },
    /**
     * @description:切换tab
     */
    changeTab(name) {
      this.tabActive = name;
    }
  }
};
</script>

<style lang="less" scoped>
.flex-row {
  display: flex;
}
.flex-one {
  flex: 1;
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
    .form-modal {
      width: 400px;
      height: 500px;
      border-radius: 2px;
      background-color: white;
      padding: 1rem;
      box-sizing: border-box;
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
      /deep/.el-input__inner {
        border: none;
        padding: 0;
      }
      .input-line {
        margin-top: 1rem;
      }
      .login-btn {
        background-color: rgba(9, 143, 167);
        border: none;
        width: 100%;
        margin-top: 2rem;
      }
      .active {
        .bottom-line {
          background-color: transparent;
          .active-line {
            width: 100%;
          }
        }
      }
      .other-login {
        font-size: 14px;
        padding-top: 2rem;
        margin-top: 2rem;
        box-sizing: border-box;
        border-top: 1px solid #dcdfe6;
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
    }
  }
}
</style>