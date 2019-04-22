// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/index.css'

/* 引入icon */
import '@/assets/fonts/iconfont.css'
Vue.use(ElementUI)

/* 同意请求url */
axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
/**/

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
