import request from '@/utils/request'

// 获取员工信息简单列表
export function getemployeessimply() {
    return request({
        url: '/sys/user/simple'
    })
}