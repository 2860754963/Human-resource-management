// 进行 路由对象的导出
// 左侧导航栏 会根据 路由规则 数量进行 循环输出
export default {
    path: '/salarys',
    name: 'salarys', // 给路由规则加一个name, 因为设置了默认子路由  所以 name 可以不写，会出现vue 警告
    component: () => import('@/layout'),////这里是在 layout下的 工资页面
    children: [{
        path: '',///默认子路由
        component: () => import('@/views/salarys'),
        meta: { // meta属性的里面的属性  随意定义
            //   左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
            title: '工资管理',
            icon: 'money'
        }
    }]
}
