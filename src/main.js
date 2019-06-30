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
  config.headers.Authorization = `Bearer ${userInfo.token}`
  //允许通过的方式      config 本次请求的相关数据
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})



// axios响应拦截器
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
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
