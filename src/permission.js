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
            if (!store.getters.userid) {// 如果信息不存在的话，就调用 userinfo
                await store.dispatch('user/userinfo')
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