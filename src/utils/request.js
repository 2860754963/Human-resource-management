import Axios from "axios";
import { Message } from 'element-ui'
import store from "@/store";
import { gettimekey } from '@/utils/auth'
import router from "@/router";
const serve = Axios.create({
    // baseURL: 'http://localhost:8888' + process.env.VUE_APP_BASE_API, ///因为 开发环境和生产环境所使用的  加载配置文件 中都有 这个VUE_APP_BASE_API变量
    baseURL: process.env.VUE_APP_BASE_API, ///因为 开发环境和生产环境所使用的  加载配置文件 中都有 这个VUE_APP_BASE_API变量
    // baseURL: process.env.VUE_APP_BASE_API, ///因为 开发环境和生产环境所使用的  加载配置文件 中都有 这个VUE_APP_BASE_API变量
    timeout: 5000,////设置超时时间
})
// 请求拦截器 
const outtime = 3600 ///超时时间
// 定义token过期处理函数
const checktime = function () {
    var currentTime = Date.now() // 当前时间戳
    var timeStamp = gettimekey() // 缓存时间戳
    return (currentTime - timeStamp) / 1000 > outtime
}
// 进行token注入
serve.interceptors.request.use(congif => {
    if (store.getters.token) {//进行 token存在判断
        // 这里进行 token 过期处理判断

        if (checktime()) {
            // 过期处理
            store.dispatch('user/logout') ///调用登出方法
            router.push('/login')
            return Promise.reject(new Error('token超时了'))

        }
        congif.headers['Authorization'] = `Bearer ` + store.getters.token
    }
    return congif ///无论什么操作都要返回 config
}, error => {
    return Promise.reject(error)
})




// 响应拦截器
// 进行token超时的被动处理
// 响应 拦截器 理清思路：
// 因为 接口返回数据的成功与失败  都会返回  success 的true或者false，而且 axios 默认加了一层data
// 进行处理，响应拦截器 的use中 存在成功的回调函数 与失败的回调函数
// 在成功的回调中，进行 success成功后返回  结构后的data，success失败后返回Promise.reject(new Error(message))
// 在失败的回调中 ，返回Promise.reject(new Error(message))
serve.interceptors.response.use(respose => {
    const { success, data, message } = respose.data
    console.log(message);
    if (success) {
        Message.success(message + '😘')
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    // 切记   ：：：：：error存在response对象
    console.log(error.response);
    const { data } = error.response
    if (data.code === 10002 && data.success === false) {///被动处理 token超时问题
        console.log(1231231);
        store.dispatch('user/logout') ///调用登出方法
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
    }
    Message.error(error.message)
    return Promise.reject(error)
})
export default serve
// 这里的默认到导出 ，不管对象导入的是 serve 或者是 request