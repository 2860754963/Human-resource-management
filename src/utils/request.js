import Axios from "axios";
const serve = Axios.create()
// 请求拦截器
serve.interceptors.request.use()
// 相应拦截器
serve.interceptors.response.use()
export default serve
// 这里的默认到导出 ，不管对象导入的是 serve 或者是 request