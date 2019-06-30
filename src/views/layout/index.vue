<template>
  <div>
    <AppAside></AppAside>
    <AppHeader></AppHeader>
    <!-- 这里是 home 文章管理 发布文章 等 -->
  </div>
</template>


<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'Applayout',
  components: {
    AppHeader,
    AppAside
  }
}
</script>


<style lang="less" scoped>
</style>
