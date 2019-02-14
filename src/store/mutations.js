
export const userStatus = (state, user) => {
  /**
   * 更改用户状态
   */
  if (user) {
    state.currentUser = user
    state.isLogin = true
  } else if (user == null) {
    /**
     * 登出时 清空sessionStorage
     */
    sessionStorage.setItem('username', null)
    sessionStorage.setItem('currentUser', null)
    sessionStorage.setItem('isLogin', false)
    state.currentUser = null
    state.isLogin = null
  }
}
