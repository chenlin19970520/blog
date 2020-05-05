<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">博客后台管理</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <i slot="prepend" class="icon el-icon-lx-people"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <i slot="prepend" class="el-icon-lx-lock"></i>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" :loading="loginLoading" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import md5 from 'md5';
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            pass: true,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            loginLoading: false
        };
    },
    methods: {
        handleClick() {},
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    if (!this.pass) {
                        return;
                    }
                    this.pass = false;
                    setTimeout(res => {
                        this.pass = true;
                    }, 1000);
                    this.loginLoading = true;
                    this.axios
                        .get('/manage/manager/login',{
                            params: {
                            username: this.param.username,
                            password: md5(this.param.password)
                        }
                        })
                        .then(res => {
                            this.loginLoading = false;
                            this.$message.success('登录成功');
                            sessionStorage.setItem('token', res.data.token);
                            sessionStorage.setItem('ms_username', JSON.stringify(res.data));
                            this.$router.push('/');
                        })
                        .catch(res => {
                            this.loginLoading = false;
                        });
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    // border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 10px 30px 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background-color: #fff !important;
    background-image: none !important;
    color: #000000 !important;
}
/deep/ .el-tabs {
    .el-tabs__item {
        color: white !important;
        width: 33.33%;
        text-align: center;
    }
    // .el-tabs__item.is-active {
    //     color: #409eff !important;
    // }
    .el-tabs__nav {
        width: 100%;
    }
    .el-tabs__nav-wrap::after {
        display: none;
    }
    .el-tabs__active-bar {
        background-color: white;
    }
}
</style>
