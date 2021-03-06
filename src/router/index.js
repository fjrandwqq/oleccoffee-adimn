import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Home from '../views/Home'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Home,
    // redirect: '/dashboard',
    // redirect: 'noredirec',
    // name: 'Dashboard',
    redirect: '/order/orderList',
    hidden: true
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index')
  //     }
  //   ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   {
//     path: '/example',
//     component: Home,
//     redirect: '/example/table',
//     name: 'Example',
//     meta: { title: '例子', icon: 'example' },
//     children: [
//       {
//         path: 'table',
//         name: 'table',
//         component: () => import('@/views/table/index'),
//         meta: { title: '表格', icon: 'table' }
//       },
//       {
//         path: 'tree',
//         name: 'tree',
//         component: () => import('@/views/tree/index'),
//         meta: { title: '树', icon: 'tree', roles: ['admin'] }
//       }
//     ]
//   },

//   {
//     path: '/form',
//     component: Home,
//     children: [
//       {
//         path: 'index',
//         name: 'Form',
//         component: resolve => require(['@/views/form/index'], resolve),
//         meta: { title: '表单', icon: 'form' }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ];

export const asyncRouterMap = [
  {
    path: '/shops',
    name: 'shops',
    component: Home,
    alwaysShow: true,
    meta: { title: '店铺管理', icon: 'example', code: 'shopManage' },
    children: [
      {
        path: 'table',
        name: 'shopsManage',
        component: () => import('@/views/table/index'),
        meta: { title: '店铺列表', icon: 'table', code: 'shopList' }
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    component: Home,
    alwaysShow: true,
    meta: { title: '商品管理', icon: 'tree', code: 'goodsManage' },
    children: [
      {
        path: 'tree',
        name: 'goodsManage',
        component: () => import('@/views/tree/index'),
        meta: { title: '商品列表', icon: 'table', code: 'goodsList' }
      }
    ]
  }, {
    path: '/order',
    name: 'order',
    component: Home,
    alwaysShow: true,
    redirect: '/order/orderList',
    meta: { title: '订单管理', icon: 'order', code: 'ordersManage' },
    children: [
      {
        path: 'orderList',
        name: 'orderMange',
        component: () => import('@/views/olec/order/OrderList'),
        meta: { title: '订单列表', icon: 'order', code: 'ordersList' }
      }
    ]
  }, {
    path: '/setting',
    name: 'setting',
    component: Home,
    alwaysShow: true,
    meta: { title: '配置管理', icon: 'setting', code: 'settingManage' },
    children: [
      {
        path: 'settingDetail',
        name: 'settingMange',
        component: () => import('@/views/olec/setting/Setting'),
        meta: { title: '配置详情', icon: 'setting', code: 'settingDetail' }
      }
    ]
  }
]
