<template>

  <!-- el-select 的 value 属性 用来绑定需要同步的数据 值是我们通过props的数据 -->
  <!-- el-select 的 change事件 当选中项发生改变时被触发 回调参数就是选中项的value -->

  <el-select clearable
             :value="value"
             @change="handlechange">
    <!-- clearable鼠标放上去之后有个叉号 -->
    <el-option v-for="item in channels"
               :key="item.id"
               :label="item.name"
               :value="item.id"></el-option>
  </el-select>

</template>


<script>
export default {
  name: 'ArticleChannel',

  // 子组件用 props 声明他预期接收的数据并使用
  props: {
    value: {
      type: [String, Number],
      required: true
    }

  },



  data () {
    return {
      channels: []
    }
  },

  created () {
    this.loadChannels()
  },

  methods: {
    loadChannels () {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        this.channels = data.channels
      }).catch(err => {
        this.$message.error('失败')
      })
    },

    // 选中项改变时，子传父，将选中项的value值给父组件，这样才能视图变化
    handlechange (val) {
      this.$emit('input', val)
    }
  }
}
</script>
 

<style lang="less" scoped>
</style>
