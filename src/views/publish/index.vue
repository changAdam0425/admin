<template>
  <el-card class="publish-card">
    <div slot="header"
         class="header">
      <span>发布文章</span>
    </div>
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="标题">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
      </el-form-item>
      <el-form-item label="频道">
        <el-button>发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
export default {

}
</script>


<style lang="less" scoped>
.publish-card {
  height: 100%;
}
</style>
