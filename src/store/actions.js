/**
 * 应用mutation
 * @param commit
 * @param user
 */
export const setUser = ({commit}, user) => {
  commit('userStatus', user)
}
