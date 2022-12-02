// 进行组件的全局注册
//1. 普通方式
// import Vue from 'vue'
//Vue.component('PageTools', PageTools)
import PageTools from './pagetools'
import uploadexcel from './uploadexcel'
import imageupload from './imageupload'
import print from 'vue-print-nb'////导入打印组件
import screenfull from './screenfull'
import themepick from './themepicker'
import lang from './lang'
import TagsView from './TagsView'
export default {
    // 因为 Vue.use()中存在install 方法
    install(Vue) {
        Vue.component('pagetools', PageTools)
        Vue.component('uploadexcel', uploadexcel)
        Vue.component('imageupload', imageupload)
        Vue.component('screenfull', screenfull)
        Vue.component('themepick', themepick)
        Vue.component('lang', lang)
        Vue.component('TagsView', TagsView)
        Vue.use(print)///使用打印组件
    }
}
// 在  main.js中  引入