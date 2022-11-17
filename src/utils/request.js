import Axios from "axios";
import { Message } from 'element-ui'
import store from "@/store";
const serve = Axios.create({
    baseURL: 'http://localhost:8888' + process.env.VUE_APP_BASE_API, ///因为 开发环境和生产环境所使用的  加载配置文件 中都有 这个VUE_APP_BASE_API变量
    // baseURL: process.env.VUE_APP_BASE_API, ///因为 开发环境和生产环境所使用的  加载配置文件 中都有 这个VUE_APP_BASE_API变量
    timeout: 5000,////设置超时时间
})
// 请求拦截器 
// 进行token注入
serve.interceptors.request.use(congif => {
    if (store.getters.token) {//进行 token存在判断
        congif.headers['Authorization'] = `Bearer ` + store.getters.token
    }
    return congif ///无论什么操作都要返回 config
}, error => {
    return Promise.reject(error)
})
// 响应拦截器
// 响应 拦截器 理清思路：
// 因为 接口返回数据的成功与失败  都会返回  success 的true或者false，而且 axios 默认加了一层data
// 进行处理，响应拦截器 的use中 存在成功的回调函数 与失败的回调函数
// 在成功的回调中，进行 success成功后返回  结构后的data，success失败后返回Promise.reject(new Error(message))
// 在失败的回调中 ，返回Promise.reject(new Error(message))
serve.interceptors.response.use(respose => {
    const { success, data, message } = respose.data
    if (success) {
        Message.success(message)
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.message)
    return Promise.reject(error)
})
export default serve
// 这里的默认到导出 ，不管对象导入的是 serve 或者是 request