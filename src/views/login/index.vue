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
import '@/vendor/gt'  //gt会向全局暴露一个 window 函数 initGeetest 用来初始化极验的验证码
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
        const data = res.data.data
        // 2, 调用 极验 提供的 API，通过上一步得到的数据初始化验证码
        initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'  //隐藏按钮式，点了发送验证码立即弹出人机交互图，
        }, function (captchaObj) {
          // captchaObj 极验 验证码对象
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function () {
            //只有 ready 了才能显示验证码
            captchaObj.verify(); //显示验证码
          }).onSuccess(function () {
            //极验 验证成功
          })
        })
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
