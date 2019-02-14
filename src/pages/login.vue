<template>
  <div id="login">
    <p>Welcome to Sys</p>
    <p>{{msg}}</p>
    <el-form ref="form" :modal="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
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
  import router from '@/router/index'

  // 登陆实例大量参考了该文章(http://hyuhan.com/2016/11/17/A-data-display-platform/)，谢谢
  let data = {
    // Vue中如果要双向数据绑定，即使字段为空，也要为其设置默认值
    form: {
      name: 'superAdmin',
      password: ''
    },
    msg: '',
    onLogging: false
  }

  export default {
    // data必须为一个函数
    data: function () {
      return data
    },
    methods: {
      // 从store.actions中引入方法
      ...mapActions(['logIn', 'loginSuccess']),
      onSubmit: function (e) {
        if (this.onLogging) {
          this.msg = '正在登陆中'
          return false
        }
        // 开个超级用户免密登陆
        if (this.form.name === 'superAdmin') {
          this.logIn({name: 'superAdmin'})
          this.loginSuccess()
          return
        }
        this.onLogging = true
        if (!this.form.name || !this.form.password) {
          this.msg = '请输入账号密码'
          this.onLogging = false
          return
        }
        login.login(this.form.name, this.form.password).then(response => {
          if (response.code === 200) {
            /**
             * 将用户信息保存到sessionStorage中
             */
            sessionStorage.setItem('username', response.data.user.name)
            sessionStorage.setItem('currentUser', JSON.stringify(response.data.user))
            sessionStorage.setItem('isLogin', true)
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
</script>

<style>
  #login {
    width: 300px;
    margin: 0 auto;
  }
</style>
