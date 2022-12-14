import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import checkbtnpermission from './mixin/checkbtnpermission'///导入 检查按钮权限 混入
Vue.mixin(checkbtnpermission)////全局使用
/*
自定义指令 的 全部  全局注册
*/
import * as directives from '@/directives'
// Object.keys(directives)  这个得到的是一个  包含 imageerror 的数组
Object.keys(directives).forEach(value => {
  ///value 就是数组中的每一项 ，就是 imageerror
  Vue.directive(value, directives[value])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 **如果您不想使用模拟服务器*，您想使用MockJs作为模拟api*，您可以执行：mockXHR（）
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 * 目前，MockJ将在生产环境中使用，*请在联机前删除它！
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 当我们全局注册i18n的时候，每个组件都会拥有一个 ** `$t` ** 的方法，
// 导入 多国语言组件
import i18n from '@/lang'
Vue.use(ElementUI, {
  // t方法是去找 对应的语言下的值 去显示
  i18n: (key, value) => i18n.t(key, value)
})
// set ElementUI lang to EN
// 这里  将el 的 组件 设置为  英文了
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 全局注册组件
import Component from '@/components'
Vue.use(Component) // 注册自己的插件，这个use方法会调用上边的install

// 全局 循环注册 监听器
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
