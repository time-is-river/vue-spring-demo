<template>
  <!-- 我不会做页面，请将就使用 -->
    <div>
      <!-- 通过$store.state.user 可以获得登陆时记录的用户 -->
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="success" class="userIcon">{{$store.state.userName}}</el-button>
          <el-button type="primary" @click="onLogout" round class="signout">注销</el-button>
        </el-col>
      </el-row>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { removeToken } from '../utils/auth'

  export default {
    methods: {
      // 从store.actions中引入方法
      ...mapActions(['setUser']),
      onLogout: function () {
        removeToken()
        this.setUser(null)
        location.reload()
      }
    }
  }
</script>

<style>

</style>
