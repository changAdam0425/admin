import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/Home')
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
