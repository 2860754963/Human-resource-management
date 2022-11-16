// vuex存储token与token数据持久化
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()  ///需要对token建立快捷访问
}
const mutations = {
  settoken(state, token) {
    state.token = token
    setToken(token)
  },
  removetoken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, layload) {///context，在这里就代表看了 this.$store
    const res = await login(layload) ///因为axios默认套上一层 data，在相应拦截器中 进行处理了
    context.commit('settoken', res)

  }
}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}