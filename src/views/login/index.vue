<template>
  <div>
    <el-form :model="form">
      <el-form-item>
        <el-input placeholder="手机号"
                  v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 支持栅格布局，一共是24列 -->
        <el-col :span="10">
          <el-input placeholder="验证码"
                    v-model="form.code"></el-input>
        </el-col>
        <el-col :span="10"
                :offset="2">
          <el-button @click="handleSendCode">
            获取验证码
          </el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox></el-checkbox>
        <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
      </el-form-item>
      <el-form-item>
        <!-- 给组件加 class，会作用到它的根元素 -->
        <el-button class="btn-login"
                   type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        mobile: '18401683724',
        code: ''
      }
    }
  },


  methods: {
    handleSendCode () {
      const { mobile } = this.form
      // 1, 点击获取验证码按钮，发送请求，获取用来初始化验证码的参数
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>



<style lang="less" scoped>
div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
