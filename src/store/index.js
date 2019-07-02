// vuex容器
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



//创建容器对象
const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  mutations: {
    changeUser (state, data) {
      //对象拷贝，将data中的成员拷贝到state.user中
      Object.assign(state.user, data)
      //将修改之后的信息保存到本地存储
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
    }
  }
})


//导出容器对象
export default store