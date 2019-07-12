<template>
  <div id="login">
    <p>welcome to HX supermarket</p>
    <p>{{msg}}</p>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="loginForm.userName" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="imageCode">
        <el-col :span="14">
        <el-input v-model="loginForm.imageCode" placeholder="请输入验证码"></el-input>
        </el-col>
          <el-col :span="8">
          <!-- 引入验证码组件 -->
          <div class="verify-box" @click="makeCode">
            <img :src="captchaImage" />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="pwdType" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >立即登陆</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 从vuex引入mapActions方法
  import { mapActions } from 'vuex'
  import login from '@/api/login'
  import captcha from '@/api/captcha'
  import router from '@/router/index'
  import { randomNumeric } from '@/utils'
  import { setToken } from '../utils/auth'

  export default {
    name: 'home',
    data () {
      const imageCodeValidator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写验证码'))
        }
        captcha.checkCaptcha(this.identifyCode, value).then(response => {
          if (response.code === 200) {
            callback()
          } else {
            callback(new Error('验证码错误'))
          }
        })
      }
      return {
        loginForm: {
          userName: '',
          imageCode: '',
          password: '',
          key: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          imageCode: [
            { required: true, trigger: 'blur', validator: imageCodeValidator }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        msg: '',
        onLogging: false,
        pwdType: 'password',
        captchaImage: '',
        identifyCode: ''
      }
    },
    methods: {
      // 从store.actions中引入方法
      ...mapActions(['logIn', 'loginSuccess', 'setUser']),
      async makeCode () {
        this.identifyCode = randomNumeric(4)
        this.captchaImage = await captcha.getCaptcha(this.identifyCode)
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
    },
    mounted () {
      this.makeCode()
    }
  }
</script>

<style>
  #login {
    width: 300px;
    margin: 0 auto;
  }
</style>
