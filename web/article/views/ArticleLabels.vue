<template>
  <div class="panel article_new" v-loading="isLoading">
    <div class="panel-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">{{i18n('article.Home')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item ><a href="/article">{{i18n('article.Article')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{i18n('article.["Label Mamagement"]')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="header_title">
        <h1 class="title">{{i18n("article['Label Mamagement']")}}</h1>
      </div>
    </div>
    <div class="panel-body">
      <el-dropdown type="primary" size="small" trigger="click">
        <el-button type="primary" size="small">
          <span>{{i18n('article["Batch operation"]')}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{i18n('article.Delete')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-row>
        <el-col :span="18" class="content">
          <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              column-key="label_id"
              prop="title"
              :label="i18n('article.Title')">
            </el-table-column>
            <el-table-column
              prop="description"
              :label="i18n('article.Description')">
            </el-table-column>
            <el-table-column
              prop="count"
              :label="i18n('article.Count')">
            </el-table-column>
            <el-table-column class-name="btn_group" width="150px" :label="i18n('article.Control')">
              <template slot-scope="scope">
                <el-button class="btn" size="mini" icon="iconfont icon-edit" @click.stop="doShowDialog('edit', scope.row)"></el-button>
                <el-button class="btn" size="mini" icon="iconfont icon-shanchu" @click.stop="doShowDialog('delete', scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5" :push='1' class="silderbar">
          <el-card class="box-card">
            <div slot="header" class="clearfix">{{i18n('article.Label')}}</div>
            <div class="section">
              <el-form class="form_label" size="small">
                <el-form-item>
                  <el-input :placeholder="i18n('article.Label')"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input :placeholder="i18n('article[\'Label Description\']')" type='textarea' :row="4"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">{{i18n('article.Add')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="panel-footer">
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
        label_id:1001,
        title: '旅行',
        count:2,
        description:"描述一",
      }, {
        label_id:1002,
        title: '财经',
        count:0,
        description:"描述二",
      }, {
        label_id:1003,
        title: '科技',
        count:2,
        description:"描述一",
      }, {
        label_id:1004,
        title: '金融',
        count:2,
        description:"描述一",
      }, {
        label_id:1005,
        title: '生物',
        count:2,
        description:"描述一",
      }, {
        label_id:1006,
        title: '驴友',
        count:2,
        description:"描述一",
      }, {
        label_id:1007,
        title: '团建',
        count:2,
        description:"描述一",
      }],
      multipleSelection: [],
      page: {
        current: 1,
        size: 5,
        total: 26,
      },
      isLoading: false,
    };
  },
  methods: {
    handleCurrentChange(){

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showError(msg) {
      this.$message.error(msg)
    },
    doShowDialog(key, row) {
      if(key=="delete"){
        this.$alert('是否删除？' , {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }
        });
      }else if(key=="edit"){
        console.log("===edit")
      }
    },
  }
}
</script>
<style lang="less" scoped>
.panel.article_new {
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
    >.table{margin-top:10px;}
    >.form{
      .silderbar{
        >.box-card{
          margin-top:20px;    
          &:first-child{margin-top:0;}
        }
      }
    }
  }
  >.panel-footer {
    padding: 8px 20px;
    border-top: none;
    >.pagination{margin-top:20px;text-align: left;}
  }
}
</style>
