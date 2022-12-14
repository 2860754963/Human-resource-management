/*
自定义指令的处理

*/
export const imageerror = {
    inserted(dom, options) {
        // 拖过由地址但是显示不出来的话，使用默认图片
        // 图片加载 异常会触发 原生的 onerror 事件函数
        // dom.onerror = function () {
        //     dom.src = options.value//options.value就是使用指令时 ,传递进来的值
        // }
        //如果src是null，那么就将value（也就是默认值）给src
        dom.src = dom.src || options.value
        dom.onerror = function () {
            dom.src = options.value
        }
    },
    componentUpdated(dom, options) {///钩子函数，在组件 更新完毕之后执行
        dom.src = dom.src || options.value
    }
}