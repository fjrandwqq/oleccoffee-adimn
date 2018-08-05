import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getLoginFlag } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getLoginFlag()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      console.log(store.getters)
      if (store.getters.menus && store.getters.menus.length === 0) {
        // 判断菜单是否拉取
        // store.dispatch('GetMenus').then(res => { // 拉取user_info
        //   console.log(res.data)
        //   const menus = res.data
        //   store.dispatch('GenerateRoutes', { menus }).then(() => {
        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //   })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || '认证失败，请重新登录')
        //     next({ path: '/' })
        //   })
        // })
        const menus = [
          {
            code: 'shopManage',
            name: '店铺管理',
            children: [
              {
                code: 'indexSetting',
                name: '首页配置'
              },
              {
                code: 'shopList',
                name: '店铺列表'
              }
            ]
          },
          {
            code: 'goodsManage',
            name: '商品管理',
            children: [{
              code: 'goodsList',
              name: '商品列表'
            }]
          },
          {
            code: 'orderManage',
            name: '订单管理',
            children: [{
              code: 'orderList',
              name: '订单列表'
            }]
          },
          {
            code: 'userManage',
            name: '用户管理',
            children: [{
              code: 'userList',
              name: '用户列表'
            }]
          },
          {
            code: 'weChatManage',
            name: '微信管理',
            children: [
            ]
          },
          {
            code: 'systemManage',
            name: '系统管理',
            children: [
            ]
          }
        ]
        store.dispatch('GenerateRoutes', { menus }).then(() => {
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
