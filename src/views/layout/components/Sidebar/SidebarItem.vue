<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden && item.children">
        <router-link v-if="routerLink(item)" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
            <svg-icon v-if="item.children[0].meta && item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
            <span v-if="item.children[0].meta && item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-if="subMenu(item)" :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
          </template>

          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path"
              ></sidebar-item>

              <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
                <el-menu-item :index="item.path + '/' + child.path">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    routerLink (router) {
      const noHidden = router.children.filter(child => !child.hidden)
      return noHidden.length === 1 && !router.children[0].children && !router.alwaysShow
    },
    subMenu (router) {
      const noHidden = router.children.filter(child => !child.hidden)
      return noHidden.length > 1
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-menu-item.is-active {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(64, 158, 255) !important;
}
</style>
