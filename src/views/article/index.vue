<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="form"
               :model="filterParams"
               label-width="80px">
        <el-form-item label="状态">
          <el-radio-group>
            <el-radio label="">全部</el-radio>
            <el-radio>草稿
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select>
            <el-option label="全部"
                       value=""></el-option>
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker>
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选区域 -->

    <!-- 列表 -->
    <el-card class="list-card">
      <div slot="header"
           class="clearfix">
        <span>共找到15条符合条件的内容</span>
      </div>

      <!-- table 表格 -->
      <!--
        data 用来指定表格的数据
        表格不需要我们自己手动遍历
        只需要把数据给 el-table 的 data 属性就可以了
        然后配置 el-table-column 需要展示的数据字段即可
       -->
      <el-table class="list-table"
                :data="articles"
                style="width: 100%">
        <el-table-column label="封面"
                         width="60">
          <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要 -->
          <!--
            slot-scope 是插槽作用域，现在先听个名词，你要知道的是值 scope 是起的一个名字
            scope 中有个成员叫 row
            也就是说 scope.row 就是当前的遍历项对象
            自定义列模板，el-table-column 的 prop 就没有意义了
          -->
          <template>
            <img width="30">
          </template>
        </el-table-column>
        <el-table-column label="标题"
                         width="180">
        </el-table-column>
        <el-table-column label="发布日期"
                         width="180">
        </el-table-column>
        <el-table-column label="状态">
          <template>
            <el-tag>0</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="success"
                       plain>修改</el-button>
            <el-button type="danger"
                       plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table 表格 -->

      <!-- 数据分页 -->
      <!--
        一：分多少页
          每页多大，默认是10条每页，我们的接口如果没有指定每页条数，则默认也是按照每页10条返回数据
          有多少条数据
          total  总记录数
          current-page 当前页码，也就是高亮的那个页码
        二：页面改变加载对应的页码数据
       -->
      <el-pagination background
                     layout="prev, pager, next">
      </el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <!-- /列表 -->
  </div>
</template>



<script>
export default {
  name: 'AppArticle',
  data () {
    return {
      filterParams: {},
      articles: {}
    }
  },

  methods: {
    onSubmit () { },
  }
}
</script>


<style lang="less" scoped>
</style>
