// vuex存储token与token数据持久化
import { getToken, setToken, removeToken, settimekey } from '@/utils/auth'
import { login, getuserinfo, getstaffinfo } from '@/api/user'
// 重置 路由
import { resetRouter } from '@/router'
const state = {
  token: getToken(), ///需要对token建立快捷访问
  userinfo: {}
}
const mutations = {
  // 设置token
  settoken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除 token
  removetoken(state) {
    state.token = null
    removeToken()
  },
  // 设置 userinfo
  setuserinfo(state, payload) {
    state.userinfo = payload
    // state.userinfo = { ...payload }
  },
  // 删除 userinfo
  removeuserinfo(state) {
    state.userinfo = {}
  }
}
const actions = {
  // 登录
  async login(context, layload) {///context，在这里就代表看了 this.$store
    const res = await login(layload) ///因为axios默认套上一层 data，在相应拦截器中 进行处理了
    context.commit('settoken', res) //得到token 写入时间戳
    settimekey()///写入时间戳，在token注入的时候进行验证


  },

  // 获取用户信息
  async userinfo(context) {
    const res = await getuserinfo() //获取基本资料
    const result = await getstaffinfo(res.userId) //获取员工基本信息
    console.log(result);
    context.commit('setuserinfo', { ...res, ...result })
    return res ////这里进行铺垫 只需要基本资料就可以
  },
  // 退出登录

  logout(context) {
    context.commit('removetoken')
    context.commit('removeuserinfo')
    resetRouter()
    context.commit('permission/setroutes', [], { root: true })///子模块访问另一个 子模块的 mutations里的函数
    context.dispatch('tagsView/delAllViews', null, { root: true })/////清空多标签页
  }

}




export default {
  namespaced: true,
  state,
  mutations,
  actions
}