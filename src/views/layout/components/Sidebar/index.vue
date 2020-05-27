<template>
  <scroll-bar>
    <div class="logo">
      <div class="image" v-if="!isCollapse">
        <img :src="imgLogo" alt="国强TMS" />
        <div class="info">{{ department }}</div>
      </div>
      <div class="image-min" v-else>
        <img :src="imgLogoMin" alt="国强TMS" />
      </div>
    </div>
    <el-menu
      mode="vertical"
      unique-opened
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import imgLogo from '@/assets/logo.png'
import imgLogoMin from '@/assets/logo_mini.png'

export default {
  components: { SidebarItem, ScrollBar },
  data () {
    return {
      imgLogo,
      imgLogoMin
    }
  },
  computed: {
    ...mapGetters(['permissionRouters', 'sidebar', 'department']),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.logo {
  .image img {
    height: 41px;
    width: auto;
    margin: 0 auto;
  }
  .image-min img {
    height: 36px;
    width: auto;
    margin: 0 auto;
  }
  .info {
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
