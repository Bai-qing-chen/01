import Vue from 'vue'
/* 路由 */

import Router from 'vue-router'

import Login from '@/components/login.vue'

import Home from '@/components/home/home.vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

Vue.use(Router)

const router = new Router({
  routes: [{ path: '/', component: Login }, { path: '/home', component: Home }]
})
/* 路由守卫 */

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  // console.log(token)
  if (to.path !== '/login' && token === null) {
    // console.log(111)
    return next('/login')
  }
  next()
})
export default router
