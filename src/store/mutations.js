
export const userStatus = (state, userName) => {
  debugger
  /**
   * 更改用户状态
   */
  if (userName) {
    state.userName = userName
    state.isLogin = true
  } else if (userName == null) {
    /**
     * 登出时 清空localStorage
     */
    localStorage.setItem('username', null)
    localStorage.setItem('currentUser', null)
    localStorage.setItem('isLogin', false)
    state.currentUser = null
    state.isLogin = null
  }
}
