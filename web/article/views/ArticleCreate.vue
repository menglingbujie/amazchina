<template>
  <div class="panel article_new" v-loading="isLoading">
    <div class="panel-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">{{i18n('article.Home')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item ><a href="/article">{{i18n('article.Article')}}</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{i18n('article.["New Article"]')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="header_title">
        <h1 class="title">{{i18n("article['New Article']")}}</h1>
      </div>
    </div>
    <div class="panel-body">
      <el-form class="form">
        <el-row>
          <el-col :span="18">
            <el-form-item>
              <el-input placeholder="输入标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked">备选项</el-checkbox>
            </el-form-item>
            <el-form-item>
              <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="关键词（3-5个即可，多个关键词之间用英文都好隔开)"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="textarea" placeholder="描述（建议不超过140个字符）"></el-input>
            </el-form-item>  
          </el-col>
          <el-col :span="5" push='1'>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>选择分类</h3>
                <h5>选择文章所属目录，课随时发布再多个类</h5>
              </div>
              <div class="tree">
                <el-tree
                  :data="treeData"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps">
                </el-tree>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="panel-footer">
    </div>
  </div>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import moment from "moment";
import _ from "lodash";
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      content: 'Hello Quill',
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      },
      isLoading: false,
      treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },
  components: {
    quillEditor
  },
  computed:{
    // editor() {
    //   return this.$refs.myTextEditor.quillEditor
    // }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    showError(msg) {
      this.$message.error(msg)
    }
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
    .quill-editor {
      height: 200px;
    }
    .quill-editor {
      border: 1px solid #ccc;
      border-bottom: none;
    }
  }
  >.panel-footer {
    padding: 8px 20px;
    border-top: none;
    >.pagination{text-align: center;}
  }
}
</style>
