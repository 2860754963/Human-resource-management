// 进行 路由对象的导出
// 左侧导航栏 会根据 路由规则 数量进行 循环输出
export default {
    path: '/employees',
    name: 'employees', // 给路由规则加一个name
    component: () => import('@/layout'),
    children: [{
        path: '',///默认子路由
        component: () => import('@/views/employees'),
        meta: { // meta属性的里面的属性  随意定义
            //   左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
            title: '员工管理',
            icon: 'people'
        }
    }, {
        path: 'detail/:id?',
        component: () => import('@/views/employees/components/detail'),
        meta: {
            title: '员工详情'
        },
        hidden: true ////左侧菜单不显示
    }, {
        path: 'print/:id?',
        component: () => import('@/views/employees/components/print'),
        meta: {
            title: '员工打印',
            icon: 'people'
        },
        hidden: true ////左侧菜单不显示
    },]
}
