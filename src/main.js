import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
//配置axios的基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'


// axios请求拦截器
axios.interceptors.request.use((config) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  if (userInfo) {  //登陆了之后才加token，除了登录外的请求都需要token，登录不需要
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  //允许通过的方式      config 本次请求的相关数据
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})



// axios响应拦截器
axios.interceptors.response.use((response) => { // >=200 && <400 的状态码会进入这里
  // 处理响应数据
  return response.data.data
}, function (error) {   // >=400 的状态码会进入这里
  // 处理401状态码
  const status = error.response.status
  if (status === 401) {
    //删除本地存储中的用户信息，否则会跳不到 登录页 因为有token 
    window.localStorage.removeItem('user_info')
    router.push({
      name: 'Login'
    })
  }
  return Promise.reject(error)
})




//往vue原型中添加成员
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
