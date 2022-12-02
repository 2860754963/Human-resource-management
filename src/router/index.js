import Vue from 'vue'
import Router from 'vue-router'
// 引入自定义路由 规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
// 引入集成模块的 userrouter 
import userRouter from './modules/user'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意：子菜单仅在路由子菜单时出现。长度>=1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中（默认值为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目具有多个子路由时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中不会重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页
 * 可以访问所有角色
 */
export const constantRoutes = [///静态路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
    // 这个要想在 左侧显示，将hidden 改为 false，
    //同时配置 meta对象：对象里的是随便定义的
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/import'),
    }],
    userRouter
  },

  // 404页必须放在末尾！！！
  // { path: '*', redirect: '/404', hidden: true }
]
/*

 */
export const asyncRoutes = [//动态路由定义,这个是 所有的路由
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter,
  settingRouter
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  /**
   * 10.来自于 src/permission.js  路由判断 完成后，将原先的 动静合并删除 动态的
   */
  routes: [...constantRoutes]//动静路由合并
  /**
   * 11. 更新左侧菜单 store/getters.js
   */
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {///// 模板自带 的 默认重置路由的方法
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
