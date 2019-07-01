<template>
  <el-card class="publish-card">
    <div slot="header"
         class="header">
      <span>发布文章</span>
    </div>
    <el-form ref="form"
             :model="articleForm"
             label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea"
                  v-model="articleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="articleForm.channel_id">
          <el-option label="区域一"
                     value="上海"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handlePublish(false)">发布</el-button>
        <el-button @click="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
export default {
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片链接
        },
        channel_id: '3' // 频道
      },

    }
  },

  methods: {
    handlePublish (draft = false) {
      this.$http({
        methods: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }


}
</script>


<style lang="less" scoped>
.publish-card {
  height: 100%;
}
</style>
