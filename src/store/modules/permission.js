/**
 * 这个vuex模块文件 的作用 就是用来存放 静态路由 和 当前用户登陆后所拥有的路由
 */


/**
 * 1.导入静态路由
 */
import { constantRoutes } from '@/router'
/**
 * 3.对三大状态 单独定义
 */
const state = {
    /**
     * 4.定义 所有人拥有的 静态路由
     */
    routes: constantRoutes
}
const mutations = {
    /**
     *5. 定义 一个修改 静态路由的方法
     */
    setroutes(state, payload) {
        //这里的 载荷 是 传过来的 新路由.
        //需要在 原先 静态路由的基础上  将新路由 展开放入
        state.routes = [...constantRoutes, ...payload]
    }
    /**
     * 6.在  index.js进行引入 
     */
}
/**
 *   
 * 7.导入  所有 路由权限
 */
import { asyncRoutes } from '@/router'
const actions = {
    /**
     * 8.筛选路由(菜单筛选), 第二个参数 是 当前用户 所拥有的 菜单权限
     * 
     * 去往 src /permission.js
     */

    filterRoutes(context, muenus) {
        console.log(muenus);
        const routes = []
        muenus.forEach(key => {
            //key  是 在用户登陆后 得到的 标识 数组
            routes.push(...asyncRoutes.filter(obj => obj.name === key))
        });
        context.commit('setroutes', routes)
        console.log(context.state.routes);
        return routes// 这里为什么还要return  state数据 是用来 显示左侧菜单用的  return  是给路由addRoutes用的
    }
}

/**
 * 2.导出 vuex 的三大状态
 */
export default {
    namespaced: true,
    state,
    mutations,
    actions
}