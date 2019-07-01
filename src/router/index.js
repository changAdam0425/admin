import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
        },
        {
          name: 'Article',
          path: '/article',
          component: () => import('@/views/article'),
        },
        {
          name: 'Publish',
          path: '/publish',
          component: () => import('@/views/publish'),
        },
        {
          name: 'Edit',
          path: '/edit/:id',
          component: () => import('@/views/Edit'),
        },
        {
          name: 'Comment',
          path: '/comment',
          component: () => import('@/views/comment'),
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


//路由守卫 所有路由导航都要经过这里 
// to 去哪    from 从哪来     next 允许通过的方法
router.beforeEach((to, from, next) => {

  const userInfo = window.localStorage.getItem('user_info')

  // 如果是非 /login 页面，判断其登录状态
  if (to.path !== '/login') {
    // 如果没有登录，让其跳转到登录页
    if (!userInfo) {
      next({ name: 'Login' })
    } else {
      // 如果登录了，则允许通过
      next()
    }
  } else {
    // 如果登录了，就不允许访问登录页了
    if (userInfo) {
      next(false)
    } else {
      // 没有登录，才允许访问登录页
      next()
    }
  }
})




export default router
