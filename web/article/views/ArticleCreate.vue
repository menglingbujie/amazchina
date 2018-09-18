<template>
  <div class="panel article_list" v-loading="isLoading">
    <div class="panel-header">
      <span>{{i18n("article['Article']")}}</span>
    </div>
    <div class="panel-body">
      
    </div>
    <div class="panel-footer" v-if="page.total>0">
      <el-pagination
        small
        class="pagination"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page.current"
        :page-size="page.size"
        layout="prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
      },
      isLoading: true,
    };
  },
  created() {
  },
  methods: {
    showError(msg) {
      this.$message.error(msg)
    }
  }
}
</script>
<style lang="less" scoped>
.panel.article_list {

  >.panel-header {
    border: 1px solid #eee;
    border-bottom: none;
  }
  >.panel-footer {
    padding: 8px 20px;
    border: 1px solid #eee;
    border-top: none;
    >.pagination{text-align: center;}
  }
}
</style>
