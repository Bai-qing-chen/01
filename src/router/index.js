import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Login}
  ]
})
