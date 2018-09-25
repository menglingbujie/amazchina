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
          <el-col :span="18" class="content">
            <el-form-item>
              <el-input placeholder="输入标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="isRecommend">推荐</el-checkbox>
            </el-form-item>
            <el-form-item>
              <quill-editor
                v-model="editorContent"
                :options="editorOpt"
              ></quill-editor>
              <div>{{editorContent}}</div>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="关键词（3-5个即可，多个关键词之间用英文都好隔开)"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="textarea" placeholder="描述（建议不超过140个字符）" :rows="4"></el-input>
            </el-form-item>  
            <el-form-item class="btns">
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-checkbox class="ispublish" v-model="isPublish">立即发布</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5" :push='1' class="silderbar">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h3>选择分类</h3>
                <h5 class="subtitle">选择文章所属目录，课随时发布再多个类</h5>
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
              <div slot="header" class="clearfix">标签</div>
              <div class="section">
                <el-form class="form_label" size="small">
                  <el-form-item>
                    <el-row>
                      <el-col :span="17"><el-input placeholder="标签"></el-input></el-col>
                      <el-col :span="6" :push="1"><el-button type="primary">提交</el-button></el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
                <div class="tags">
                  <el-tag closable @close="doCloseTag(1)">标签一</el-tag>
                  <el-tag closable @close="doCloseTag(2)">标签二</el-tag>
                  <el-tag closable @close="doCloseTag(3)">标签三</el-tag>
                  <el-tag closable @close="doCloseTag(4)">标签四</el-tag>
                </div>
                <div class="tip">多个标签请用英文逗号(,)隔开</div>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import moment from "moment";
import _ from "lodash";
import {quillEditor,Quill} from "vue-quill-editor";

export default {
  data() {
    return {
      isRecommend:false,//是否推荐
      isPublish:false,//是否立即发布
      editorOpt:{
        placeholder:this.i18n('article["Insert your text"]'),
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] },{ 'align': [] }],
            ['link','image','video'],
            ['clean'],
          ]
        }
      },
      editorContent:"",
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
  components:{quillEditor},
  methods: {
    doCloseTag(tid){
      console.log("===close tag===",tid);
    },
    showError(msg) {
      this.$message.error(msg)
    }
  }
}
</script>
<style>
.ql-picker{line-height:normal;}
</style>
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
    >.form{
      .quill-editor,
      .quill-code {
        height: 240px;
        display:inline-block;
        width:100%;
      }

      .content{
        >.btns{
          .ispublish{margin-left:20px;}
        }
      }
      .silderbar{
        >.box-card{
          margin-top:20px;    
          &:first-child{margin-top:0;}
          .clearfix{
            >.subtitle{font-size:14px; color:#999;margin-top:5px;}
          }
          .section{
            >.form_label{overflow:hidden;}
            >.tags{
              >*{
                margin:5px 0 0 5px;
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3){margin-top:0;}
                &:nth-child(3n+1){margin-left:0;}
              }
            }
            >.tip{font-size:14px;margin-top:10px;}
          }
        }
      }
    }
  }
  >.panel-footer {
    padding: 8px 20px;
    border-top: none;
    >.pagination{text-align: center;}
  }
}
</style>
