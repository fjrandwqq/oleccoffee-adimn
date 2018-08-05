const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  loginFlag: state => state.user.loginFlag,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
