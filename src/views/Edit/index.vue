<template>
  <el-card class="publish-card">
    <div slot="header"
         class="header">
      <span>修改文章</span>
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
        <!-- <el-select v-model="articleForm.channel_id">
          <el-option label="区域一"
                     value="上海"></el-option>
        </el-select> -->

        <!-- 组件通信
        父组件通过子组件标签属性传递数据
         -->
        <!-- <article-channel :value="articleForm.channel_id"
                         @input="articleForm.channel_id=$event"></article-channel> -->
        <!-- 接收子组件传递的数据 $event 事件对象 子组件中传谁就是谁 这里是 val -->

        <!-- v-model 就是 :value 和 @input 的简写 -->
        <article-channel v-model="articleForm.channel_id"></article-channel>

      </el-form-item>
      <el-form-item>
        <el-button @click="handlePublish(false)">发布</el-button>
        <el-button @click="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'AppEdit',
  components: {
    ArticleChannel
  },


  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片链接
        },
        channel_id: '' // 频道
      },

    }
  },

  creater () {
    this.loadArticle()
  },


  methods: {

    //获取文章
    loadArticle () {
      this.$http({
        methods: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(data => {
        console.log(data)
        this.articleForm = data
      }).catch(err => {
        console.log(err)
      })
    },


    //点击发布
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
