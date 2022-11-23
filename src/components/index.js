// 进行组件的全局注册
//1. 普通方式
// import Vue from 'vue'
//Vue.component('PageTools', PageTools)
import PageTools from './pagetools'
export default {
    // 因为 Vue.use()中存在install 方法
    install(Vue) {
        Vue.component('pagetools', PageTools)
    }
}
// 在  main.js中  引入