import Vue from 'vue'
import Router from 'vue-router'

// 加载组件，如果需要懒加载请参阅文档
import login from '../pages/login.vue'
import page1 from '../pages/page1.vue'
import page2 from '../pages/commodityInformation/commodityHaveBarCode/index.vue'
import page3 from '../pages/commodityInformation/commodityNoBarcode/index.vue'

Vue.use(Router)

// routes要求为一个数组，path指定路由，component指定组件，更多配置及懒加载请参阅文档
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: page3,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/#/page3',
      name: 'page3',
      component: page3,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/page3',
      name: 'page_index',
      component: page3,
      meta: {
        isLogin: true
      }
    }
  ]
})
