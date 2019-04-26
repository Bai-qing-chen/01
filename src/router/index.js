import Vue from 'vue'
/* 路由 */

import Router from 'vue-router'
/* 登录页 显示 表单布局 以及点击登录 */

import Login from '@/components/login.vue'
/* 后台首页显示 布局 头部 侧边栏显示 */

import Home from '@/components/home/home.vue'
/* 用户列表展示 添加 删除 修改  */

import Wol from '@/components/homeChild/wolCom.vue'
import Rights from '@/components/homeChild/rights'
import Roles from '@/components/roles/roles'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: Home,
      redirect: '/users',
      children: [
        { path: '/users', component: Wol },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles }
      ]
    }
  ]
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
