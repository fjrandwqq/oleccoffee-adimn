const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  unfinishedOrders: state => state.order.unfinishedOrders
}
export default getters
