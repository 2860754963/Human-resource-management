import store from "@/store";
/**
 * 这个方法主要 通过全局注入 mixin 的方式  判断组件内的 按钮是否 可用
 * 在用户登录 后 会 返回用户的 权限标识，通过调用方法进行对比 ，返回 布尔值
 */
export default {
    methods: {
        /**
         * 
         * @param {传入按钮标识} key 
         */
        checkbtnpermission(key) {
            // 登陆后 拿到 用户信息
            // store.state.user.userinfo 拿到用户信息
            const { userinfo } = store.state.user
            // 进行 二次判断 roles中的 points 按钮权限点是否存在 
            if (userinfo.roles.points && userinfo.roles.points.length) {
                return userinfo.roles.points.some(item => item === key)
            }
            return false
        }
    }
}

/**
 * 接下来在  main.js中 进行全局注册
 */