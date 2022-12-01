// 这个文件  专门处理  权限 包括路由权限 的问题
import router from '@/router'
// 前置守卫 中的next 是必须写的
/*
next()放行
next(false)停留原地
如果不调用的话，也会停在 原地

*/
import store from '@/store'
// 插件进度条
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
let whitelist = ['/login', '/404']
// 前置守卫
router.beforeEach(async function (to, from, next) {
    NProgress.start() // 开启进度条
    // 先判断token
    if (store.getters.token) {// 如果存在token
        if (to.path === '/login') {// 如果去登录页,跳到主页
            next('/')
        } else {// 否则放行
            if (!store.getters.userid) {// 如果信息不存在的话，就调用 userinfo 获取用户信息
                /**来自于store下的 permission.js
                 *  // 9.将  获取的 信息进行 结构 ，用于 路由权限的筛选
                 */

                const { roles } = await store.dispatch('user/userinfo')
                console.log(roles);
                const routes = await store.dispatch('permission/filterRoutes', roles.menus)
                console.log(routes);
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) //添加动态路由到路由表
                // addRoutes  必须 用 next(地址) 不能用next()  (这是一个已知缺陷)
                // 跳转到 要去的路径 这是一个bug , 如果使用了addRoutes之后, 必须使用next(to.path)来跳转到要去的路径, 不能使用next()
                next(to.path)
                return
                /**
                 * 10   router/index.js
                 */
            }
            next()
        }
    } else {// 没有token
        if (whitelist.includes(to.path)) {// 如果在白名单
            next()
        } else { // 否则跳转到登录页
            next('/login')
        }
    }
    NProgress.done() // 关闭进度条
})
// 后置守卫
router.afterEach(function () {
    NProgress.done() // 关闭进度条
})