import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    const index = findIndex(route, menus)
    debugger
    if (index !== -1) {
      if (route.children && route.children.length && menus.children && menus.children.length > 0) {
        route.children = filterAsyncRouter(route.children, menus[index].children)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function findIndex(route, menus) {
  for (const i in menus) {
    if (menus[i].code && menus[i].code === route.meta.code) {
      return i
    }
  }
  return -1
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data
        commit('SET_MENUS', menus)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        console.log(accessedRouters)
        // console.log(filterAsyncRouter(menus));
        // const accessedRouters = asyncRouterMap
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
