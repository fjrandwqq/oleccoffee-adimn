import Vue from 'vue'

import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import * as customFilter from './utils/filter'

import 'viewerjs/dist/viewer.min.css'
import iViewer from 'v-viewer'

Vue.use(iViewer, {
  defaultOptions: {
    zIndex: 20181120,
    title: false
  }
})

const echarts = require('echarts')

// 过滤器
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
})

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

import VueCropper from 'vue-cropper'

Vue.use(VueCropper)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
