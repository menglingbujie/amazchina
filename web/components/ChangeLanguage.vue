<template>
  <el-dropdown class="lang-container" trigger="click" placement="bottom" size="medium">
    <div class="lang-wrapper">
      <i class="icon iconfont icon-global"></i>
      <span class="title">{{currentLang}}</span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <el-dropdown-menu class="lang-dropdown" slot="dropdown">
      <el-dropdown-item v-for="(lang,idx) in langs" :divided='idx!==0' :key="lang.code">
        <div class="lang_item" @click="changeLang(lang.lang)">{{lang.name}}</div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
const Langs = require('../data/supportLang.js');
import Cookie from 'js-cookie';
export default {
  data() {
    return {
      currentLang: "",
      langs: Langs,
    }
  },
  created() {
    this.initLang();
  },
  methods: {
    initLang(){
      const lang = Cookie.get("lang");
      this.currentLang = _.find(this.langs,{lang:lang}).name;
    },
    changeLang(lang){
      if(this.$lang.lang == lang) {
        return;
      }
      Cookie.set("lang",lang,{path:"/"});
      location.reload();
    },
  }
}
</script>

<style lang="less" scoped>
.lang-container {
  display: inline-block;
  position:relative;
  white-space: nowrap;
  color:#fff;
  margin-left:30px;
  .lang-wrapper {
    cursor: pointer;
    position: relative;
    >.icon,>.title{vertical-align: middle;}
    >.title{margin-left:5px;}
    .el-icon-caret-bottom {
      font-size: 12px;vertical-align: middle;
    }
  }
}
</style>
