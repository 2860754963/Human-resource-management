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
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
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
  render: h => h(App)
})
