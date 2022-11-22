import request from '@/utils/request'


// 获取公司角色列表信息 (获取所有角色列表)
export function getroleinfo(params) {
    return request({
        url: '/sys/role',
        method: 'get',
        params
    })
}
// 获取公司信息 (根据id查询企业)
export function getcompanyinfo(id) {
    return request({
        url: `/company/${id}`,
        method: 'get'
    })
}