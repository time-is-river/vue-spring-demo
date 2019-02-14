// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 加载App.vue 组件
import App from './App.vue'
// 引入router配置文件
import router from './router'

// 引入ElementUI，可以使用其组件
import ElementUI from 'element-ui'
// css文件需手动引入
import 'element-ui/lib/theme-chalk/index.css'

// 引入vuex配置文件
import store from './store/index'

// 引入ajax框架axios配置
import axios from './axios'

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (sessionStorage.isLogin) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
/**
 * 设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
 * @type {boolean}
 */
Vue.config.productionTip = false
/**
 * 代表使用ElementUI组件
 */
Vue.use(ElementUI)
/**
 * 将axios挂载到Vue原型上方便调用
 * @type {AxiosStatic}
 */
Vue.prototype.$ajxj = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
