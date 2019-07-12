export const tokenKey = 'Authorization'

export function getToken () {
  return localStorage.getItem(tokenKey)
}

export function setToken (data) {
  localStorage.setItem('isLogin', 'true')
  localStorage.setItem('userName', data.userName)
  return localStorage.setItem(tokenKey, data.token)
}

export function removeToken () {
  localStorage.setItem('isLogin', 'false')
  return localStorage.removeItem(tokenKey)
}
