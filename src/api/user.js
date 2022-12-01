import request from '@/utils/request'
// 封装登陆方法 (登录)
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data
    })
}
// 封装获得用户个人信息的方法 (获取用户基本资料)
export function getuserinfo() {
    //需要携带请求头，通过请求拦截器进行 token 注入
    return request({
        url: '/sys/profile',
        method: 'POST'
    })
}
// 封装获得员工详细信息,包括头像 (获取员工基本信息)
export function getstaffinfo(id) {
    return request({
        ///需要请求头
        url: `/sys/user/${id}`
        // 因为axios 默认提交方式就是 get 所以可以不用写
    })
}

export function getUserDetailById(id) {
    return request({
        ///需要请求头
        url: `/sys/user/${id}`
        // 因为axios 默认提交方式就是 get 所以可以不用写
    })
}