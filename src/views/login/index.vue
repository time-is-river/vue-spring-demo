<template>
  <div class="login-container">
    <el-card shadow="always" class="card-box login-form">
      <div slot="header" class="clearfix">
        <span>
         <span class="svg-container">
            <svg-icon icon-class="login"></svg-icon>
          </span>
          欢迎登录
        </span>
      </div>
      <el-form autoComplete="on" :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px">
        <el-form-item prop="userName">
          <svg-icon icon-class="user" />
          <!--<span class="svg-container svg-container_login">
          </span>-->
          <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="off" placeholder="用户名" />
        </el-form-item>
        <!--<el-form-item prop="imageCode">
          <el-col :span="14">
            <el-input v-model="loginForm.imageCode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            &lt;!&ndash; 引入验证码组件 &ndash;&gt;
            <div class="verify-box" @click="makeCode">
              <img :src="captchaImage" />
            </div>
          </el-col>
        </el-form-item>-->
        <el-form-item prop="password">
          <svg-icon icon-class="password"></svg-icon>
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="onSubmit"
            v-model="loginForm.password"
            autoComplete="off"
            placeholder="密码"
          ></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click="onSubmit">
             登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  // 从vuex引入mapActions方法
  import { mapActions } from 'vuex'
  import login from '@/api/login'
  import router from '@/router/index'
  import { setToken } from '@/utils/auth'

  export default {
    name: 'home',
    data () {
      return {
        loginForm: {
          userName: '',
          imageCode: '',
          password: '',
          key: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        msg: '',
        loading: false,
        onLogging: false,
        pwdType: 'password',
        captchaImage: '',
        identifyCode: ''
      }
    },
    methods: {
      // 从store.actions中引入方法
      ...mapActions(['logIn', 'loginSuccess', 'setUser']),
      showPwd () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      async onSubmit () {
        const valid = await this.$refs['loginForm'].validate()
        if (valid) {
          if (this.onLogging) {
            this.msg = '正在登陆中'
            return false
          }
          // 开个超级用户免密登陆
          /**
          if (this.loginForm.name === 'superAdmin') {
            this.logIn({name: 'superAdmin'})
            this.loginSuccess()
            return
          }
           */
          this.onLogging = true
          const postForm = JSON.parse(JSON.stringify(this.loginForm))
          postForm.key = this.identifyCode
          login.login(postForm).then(response => {
            if (response.code === 200) {
              /**
               * 将用户信息保存到localStorage中

              //localStorage.setItem('username', response.data.user.name)
              //localStorage.setItem('currentUser', JSON.stringify(response.data.user))
               */

              /**
               * 保存 token
               */
              setToken(response.data)
              this.setUser(response.data.userName)

              /**
               * 将用户信息放入vuex
               */
              router.go('/')
            } else {
              this.msg = response.message
            }
          }).catch((err) => {
            this.msg = '登陆异常'
            console.log(err)
          }).finally(() => {
            this.onLogging = false
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url('https://picsum.photos/1920/1080/?random');
    background-size: cover;
    background-position: center;
    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 30px;
    }
    .el-input {
      display: inline-block;
      height: 30px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .login-form {
      position: absolute;
      top: 50%;
      right: 160px;
      width: 350px;
      padding: 0px;
      -webkit-transform: translateY(-60%);
      transform: translateY(-60%);
    }
    .el-form-item {
      border: 1px solid #ebeef5;
      border-radius: 5px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
