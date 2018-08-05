import { login, getMenus, logout } from '@/api/login'
import { getLoginFlag, setLoginFlag, removeLoginFlag } from '@/utils/auth'

const user = {
  state: {
    loginInfo: getLoginFlag(),
    name: '',
    avatar: '',
    menus: []
  },

  mutations: {
    SET_LOGINFlag: (state, flag) => {
      state.flag = true
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          if (res.data.status === 'fail') {
            reject()
          } else {
            setLoginFlag(true)
            commit('SET_LOGINFlag', true)
            commit('SET_NAME', res.username)
            commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 获取菜单
    GetMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenus().then(res => {
          if (res.data && res.data.length > 0) {
            commit('SET_MENUS', res.data)
            resolve(res)
          } else {
            reject('获取菜单失败')
          }
        }).catch(e => {
          reject(e)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_LOGINFlag', false)
          removeLoginFlag()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_LOGINFlag', false)
        commit('SET_MENUS', [])
        removeLoginFlag()
        resolve()
      })
    }
  }
}

export default user
