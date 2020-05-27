<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="logout">
      <span class="el-dropdown-link"> {{ name }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button @click="setting" type="text">账户设置</el-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button @click="logout" type="text">退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <user-setting :show.sync="settingDialog"></user-setting>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import UserSetting from '@/components/UserSetting'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    UserSetting
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name'])
  },
  data () {
    return {
      settingDialog: false
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    setting () {
      this.settingDialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .logout {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
  }
}
</style>
