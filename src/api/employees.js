import request from '@/utils/request'

// 获取员工信息简单列表
export function getemployeessimply() {
    return request({
        url: '/sys/user/simple'
    })
}

// 获取员工综合列表 数据 (获取员工列表)
export function getemployeeslist(params) {
    return request({
        url: '/sys/user',
        method: 'GET',
        params
    })
}



// 删除 员工 （推测出来的）
export function deleteroles(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}