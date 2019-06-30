import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [ //所有 children 路由都显示在 layout 的 routerview 中
        {
          name: 'Home',
          path: '',    // layout 的默认子路由
          component: () => import('@/views/Home'),
        }
      ]
    },

    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
