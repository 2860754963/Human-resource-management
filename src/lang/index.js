import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的包
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包

Vue.use(VueI18n) // 全局注册国际化包
export default new VueI18n({
    //当前的多语言的类型，随意指定字符串，一般使用en代表英文，使用zh代表中文
    locale: Cookie.get('language') || 'zh', // 从cookie中获取语言类型 获取不到就是中文
    //指定当月语言的语言包
    messages: {
        en: {//上边的locale指定的语言类型有en，这里就必须有en的配置
            ...elementEN, // 将饿了么的英文语言包引入
            ...customEN  	// 将自定义的英文语言包引入
        },
        zh: {//上边的locale指定的语言类型有zh，这里就必须有zh的配置
            ...elementZH, // 将饿了么的中文语言包引入
            ...customZH	 // 将自定义的中文语言包引入
        }
    }
})
