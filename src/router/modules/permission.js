// 进行 路由对象的导出
// 左侧导航栏 会根据 路由规则 数量进行 循环输出
export default {
    path: '/permission',
    name: 'permissions', // 给路由规则加一个name
    component: () => import('@/layout'),
    children: [{
        path: '',///默认子路由
        name: 'permissions',
        component: () => import('@/views/permission'),
        meta: { // meta属性的里面的属性  随意定义
            //   左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
            title: '权限管理',
            icon: 'lock'
        }
    }]
}
