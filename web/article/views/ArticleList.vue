<template>
  <div class="panel article_list" v-loading="isLoading">
    <div class="panel-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">{{i18n('article.Home')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item ><a href="/article">{{i18n('article.Article')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{i18n('article.["All Article"]')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="header_title">
        <h1 class="title">{{i18n("article['Article']")}}</h1>
        <el-button class="btn" icon="el-icon-edit" size="mini" type="primary" round>
          <a class="link" href="/article#/create">{{i18n('article.New')}}</a>
        </el-button>
      </div>
    </div>
    <div class="panel-body">
      <el-dropdown type="primary" size="small" trigger="click">
        <el-button type="primary" size="small">
          批量操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>删除</el-dropdown-item>
          <el-dropdown-item>发布</el-dropdown-item>
          <el-dropdown-item>草稿</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          column-key="aid"
          prop="title"
          label="标题"
          width="370">
        </el-table-column>
        <el-table-column
          prop="status"
          label="全部状态"
          :filters="filterStatusData"
          :filter-method="filterStatusHandler">
        </el-table-column>
        <el-table-column
          prop="cate"
          label="分类"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="label"
          label="标签"
          show-overflow-tooltip
          :filters="filterLabelData"
          :filter-method="filterLabelHandler">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评论"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          :filters="filterAuthorData"
          :filter-method="filterAuthorHandler"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
      tableData:  [{
        aid:1001,
        date: '2016-05-03',
        title: '上海市普陀区金沙江路 1518 弄',
        status:0,
        status_text:"草稿",
        cate:0,
        cate_text:"财经",
        label:"股票",
        comment:3,
        author:"John A",
      }, {
        aid:1002,
        date: '2016-05-02',
        title: '上海市普陀区金沙江路 1518 弄',
        status:1,
        status_text:"已发布",
        cate:1,
        cate_text:"科技",
        label:"人工智能",
        comment:3,
        author:"John A",
      }, {
        aid:1003,
        date: '2016-05-04',
        title: '上海市普陀区金沙江路 1518 弄',
        status:2,
        status_text:"Fox",
        cate:2,
        cate_text:"生活",
        label:"出行",
        comment:3,
        author:"John B",
      }, {
        aid:1004,
        date: '2016-05-01',
        title: '上海市普陀区金沙江路 1518 弄',
        status:1,
        status_text:"已发布",
        cate:0,
        cate_text:"财经",
        label:"股票",
        comment:3,
        author:"John A",
      }, {
        aid:1005,
        date: '2016-05-08',
        title: '上海市普陀区金沙江路 1518 弄',
        status:1,
        status_text:"已发布",
        cate:0,
        cate_text:"财经",
        label:"股票",
        comment:3,
        author:"John C",
      }, {
        aid:1006,
        date: '2016-05-06',
        title: '上海市普陀区金沙江路 1518 弄',
        status:1,
        status_text:"已发布",
        cate:0,
        cate_text:"财经",
        label:"股票",
        comment:3,
        author:"John A",
      }, {
        aid:1007,
        date: '2016-05-07',
        title: '上海市普陀区金沙江路 1518 弄',
        status:1,
        status_text:"已发布",
        cate:0,
        cate_text:"财经",
        label:"股票",
        comment:3,
        author:"John B",
      }],
      multipleSelection: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
      },
      isLoading: false,
      filterLabelData:[],
      filterStatusData:[],
      filterAuthorData:[],
    };
  },
  created() {
    this.tableData.forEach((v,i)=>{
      this.filterLabelData.push({text:v.label,value:v.label});
      this.filterStatusData.push({text:v.status_text,value:v.status_text});
      this.filterAuthorData.push({text:v.author,value:v.author});
    })
  },
  methods: {
    filterLabelHandler(value,row,column){
      const property = column['property'];
      return row[property]===value;
    },
    filterStatusHandler(value,row,column){
      const property = column['property'];
      return row[property]===value;
    },
    filterAuthorHandler(value,row,column){
      const property = column['property'];
      return row[property]===value;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(){

    },
    showError(msg) {
      this.$message.error(msg)
    }
  }
}
</script>
<style lang="less" scoped>
.panel.article_list {
  >.panel-header {
    >.header_title{
      font-size:0;margin-top:20px;
      >.title,>.btn{display:inline-block;vertical-align: middle;}
      >.title{font-size:30px;margin-right:10px;}
      >.btn>.link{font-size:16px;}
    }
  }
  >.panel-body{
    margin-top:20px;
  }
  >.panel-footer {
    padding: 8px 20px;
    border: 1px solid #eee;
    border-top: none;
    >.pagination{text-align: center;}
  }
}
</style>
