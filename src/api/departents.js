import request from '@/utils/request'
// 封装获取公司 部门列表（查询企业的部门列表）
export function getdepartments() {
    return request({
        url: '/company/department'
    })
}

// 删除 部门 （根据ID删除部门）
export function deldepartments(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'DELETE'
    })
}
//  新增部门 （新增部门）
export function adddepartments(data) {
    return request({
        url: "/company/department",
        method: 'POST',
        data
    })
}

// 根据id 查询部门详情  （根据ID查询部门详情）
export function getdepartmentsdetials(id) {
    return request({
        url: `/company/department/${id}`
    })
}

// 更新部门信息 （根据ID修改部门详情）
// 因为 传的参数 是在  body中，所以用 data，而body中包含了路径参数id
export function updatedepartmentsdetials(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'PUT',
        data
    })
}