import { getUserInfo } from '@/api/user'

export default {
  name: 'user',
  namespaced: true,
  state: {
    info: '',
    token: '1'
  },
  getters: {

  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.info = data
    }
  },
  actions: {
    async userInfo({ commit }) {
      try {
        const res = await getUserInfo()
        if (res) commit('SET_USER_INFO', res)
        return res
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }
  }
}
