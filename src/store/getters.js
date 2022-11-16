const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,////将子模块内的token作为父模块的 变量使用 
}
export default getters
