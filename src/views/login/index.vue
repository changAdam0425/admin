<template>
  <div>
    <el-form :model="form"
             :rules="rules"
             ref="ruleForm">
      <el-form-item prop="mobile">
        <el-input placeholder="手机号"
                  v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <!-- 支持栅格布局，一共是24列 -->
        <el-col :span="10">
          <el-input placeholder="验证码"
                    v-model="form.code"></el-input>
        </el-col>
        <el-col :span="10"
                :offset="2">
          <el-button @click="handleSendCode"
                     :disabled="!!codeTimer || codeloading">
            <!-- disabled 表示 倒计时的时候禁用按钮 -->
            {{codeTimer?`还剩${codeSeconds}秒`:'获取验证码'}}
          </el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="form.agree"></el-checkbox>
        <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
      </el-form-item>
      <el-form-item>
        <!-- 给组件加 class，会作用到它的根元素 -->
        <el-button class="btn-login"
                   @click="handlelogin"
                   :loading=loginloading
                   type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
// import axios from 'axios'
import '@/vendor/gt'  //gt会向全局暴露一个 window 函数 initGeetest 用来初始化极验的验证码
// import { clearInterval } from 'timers';

const initCodeSeconds = 60   //初始化倒计时开始时间

export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '18401683724',
        code: '',
        agree: ''
      },

      loginloading: false,  //登录按钮的 loading 状态
      codeloading: false,   //获取验证码按钮的 loading 状态

      captchaObj: null,  //极验 验证码对象

      // Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须11个字符', trigger: 'blur' }   //trigger  表示当失去焦点时验证
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },  //改变时触发验证规则
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }  //正则表达式，必须为true才能通过
        ]
      },

      //倒计时
      codeSeconds: initCodeSeconds,   //倒计时时间
      codeTimer: null,   //倒计时定时器


      sendMobile: ''     //保存初始化验证码之后用来发短信的手机号
    }
  },


  methods: {

    //点击获取验证码
    showGeetest () {
      const { mobile } = this.form


      //初始化验证码期间禁用按钮
      this.codeloading = true

      // 1, 点击获取验证码按钮，发送请求，获取用来初始化验证码的参数
      this.$http({
        method: 'GET',
        url: `/captchas/${this.form.mobile}`
      }).then(data => {
        // console.log(res)
        // const data = res.data.data
        // 2, 调用 极验 提供的 API，通过上一步得到的数据初始化验证码
        window.initGeetest({  //加上 window 前缀，否则模块化会认为是一个未定义的成员
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'  //隐藏按钮式，点了发送验证码立即弹出人机交互图，
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          // captchaObj 极验 验证码对象
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(() => {
            //只有 ready 了才能显示验证码
            captchaObj.verify() //显示验证码

            //初始化完成后，回复按钮的点击
            this.codeloading = false

            //保存sendmobile的值，为了作比较
            this.sendMobile = this.form.mobile

          }).onSuccess(() => {
            //极验 验证成功
            // console.log(captchaObj.getValidate())
            // 在极验的 onSuccess 回调函数中，将调用 captchaObj.getValidate() 获取到的结果参数作为发送短信验证码接口的请求参数发出获取短信验证码请求
            const { geetest_challenge: challenge, geetest_seccode: seccode, geetest_validate: validate } = captchaObj.getValidate()
            this.$http({
              method: 'GET',
              url: `/sms/codes/${this.form.mobile}`,
              params: { //用来传递query查询字符串参数
                challenge,
                seccode,
                validate
              }
            }).then(data => {
              //发送短信验证码成功
              // console.log(res)
              //倒计时
              this.codeCountDown()
            })
          })
        })
      })
    },



    //验证手机号，通过获取验证码
    handleSendCode () {
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {  //说明手机号有误
          return
        }
        //手机号验证成功

        //如果已经初始化没验证，就直接弹出验证码框，不要重新初始化
        if (this.captchaObj) {
          //如果用户输入的手机号和初始化时的手机号不一致，那么就重新初始化，否则直接显示
          if (this.form.mobile !== this.sendMobile) {
            //重新初始化之前，删掉原来初始化的div
            document.body.removeChild(document.querySelector('.geetest_panel'))
            //更换手机号后初始化
            this.showGeetest()
          } else {
            this.captchaObj.verify()
          }
        } else {
          //第一次初始化
          this.showGeetest()
        }

      })
    },


    //点击登录
    login () {
      this.loginloading = true
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.form
      }).then(data => {  //>=200 && <400 的状态码会进入这里
        // console.log(res)

        //登陆成功，将接口返回的用户数据放到本地存储
        window.localStorage.setItem('user_info', JSON.stringify(data))

        //登录成功提示消息
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginloading = false
        this.$router.push({
          name: 'Home'
        })
      }).catch(err => {   // >=400 的状态码会进入这里
        this.loginloading = false
        if (err.response.status === 400) {
          this.$message.error('登录失败,手机号或验证码错误')
        }
      })
    },


    //表单验证通过后登录
    handlelogin () {
      //表单组件的 validate 方法，用来获取表单的验证状态
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },


    // 倒计时
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeSeconds--
        if (this.codeSeconds <= 0) {
          this.codeSeconds = initCodeSeconds
          window.clearInterval(this.codeTimer)
          this.codeTimer = null    //清除计时器的标志，为了让按钮显示正常的获取验证码，而不是 '还剩...秒'的状态
        }
      }, 1000)
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
