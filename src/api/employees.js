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


// 新增员工 （新增员工）
export function addroles(data) {
    return request({
        url: '/sys/user',
        method: 'POST',
        data
    })
}

export function addEmployee(data) {
    return request({
        url: '/sys/user',
        method: 'POST',
        data
    })
}


// 批量导入员工  接口  (批量导入员工)
export function importroles(data) {
    return request({
        url: '/sys/user/batch',
        method: 'POST',
        data
    })
}

// 保存 员工基本信息   （保存员工基本信息）
export function saveuserinfo(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

// 获取员工 个人信息 （获取员工个人信息）
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}
// 更新用户详情信息 (保存员工个人信息)
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}


// 获取岗位信息 （获取员工岗位信息）

export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}


// 保存岗位 信息 （保存员工岗位信息） 
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}


/**
 * 
 * 给 用户分配角色
 * 
 */
export function assignRoles(data) {
    return request({
        url: '/sys/user/assignRoles',
        data,
        method: 'put'
    })
}

