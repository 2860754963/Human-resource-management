const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  ////将子模块内的token作为父模块的 变量使用 
  token: state => state.user.token,///token映射
  name: state => state.user.userinfo.username,///用户名映射
  userid: state => state.user.userinfo.userId, ///用户id映射
  staffphoto: state => state.user.userinfo.staffPhoto,///用户头像映射
  compantid: state => state.user.userinfo.companyId,///企业id 映射
}
export default getters
