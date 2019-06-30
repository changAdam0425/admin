<template>
  <div>
    <el-form :model="form">
      <el-form-item>
        <el-input placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 支持栅格布局，一共是24列 -->
        <el-col :span="10">
          <el-input placeholder="验证码"></el-input>
        </el-col>
        <el-col :span="10"
                :offset="2">
          <el-button>
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
export default {
  data () {
    return {
      form: {}
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
