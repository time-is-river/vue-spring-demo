// 先引入垫片，以支持低版本内核，如IE9
import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  /**
   * 登陆状态相关
   */
  state: {
    username: '',
    currentUser: null,
    isLogin: false
  },
  getters,
  mutations,
  actions
})

export default store
