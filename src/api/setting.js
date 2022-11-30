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

// 删除角色 （根据ID删除角色）
export function deleterole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'DELETE'
    })
}
// 根据id 获取 角色详情 （根据ID获取角色详情）

export function getroledetails(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'GET'///可以默认不写
    })
}

// 修改角色详情 （根据ID更新角色）

export function updateroles(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'PUT',
        data
    })
}

// 新增角色 (添加角色)
export function addroles(data) {
    return request({
        url: '/sys/role',
        method: 'POST',
        data
    })
}
// 给角色分配 权限
export function assignPerm(data) {
    return request({
        url: '/sys/role/assignPrem',
        method: 'PUT',
        data
    })
}

