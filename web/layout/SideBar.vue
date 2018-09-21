<template>
  <el-menu
    class="navmenu"
    :default-active="currentPath"
    :show-timeout="200"
    :collapse="isCollapse"
    background-color="#505b6b"
    text-color="#fff"
    active-text-color="#32c5d2"
    @open="menuOpen"
    @close="menuClose">
      <!-- 一级导航 -->
      <template v-for="item in routes">
        <!-- 有子导航 -->
        <el-submenu :index="item.index" v-if="!hasOneShowingChildren(item.path,item.children)"  :key="item.index">
          <template slot="title">
            <i class="iconfont" v-if="item.meta.icon" :class="'icon-'+item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <!-- 二级导航 -->
          <template v-for="child in item.children">
            <el-submenu :index="child.index" v-if="!hasOneShowingChildren(child.path,child.children)" :key="child.index">
              <i class="iconfont" v-if="child.meta.icon" :class="'icon-'+child.meta.icon"></i>
              <span slot="title">{{child.meta.title}}</span>
              <!-- 三级导航 -->
              <el-menu-item :index="subchild.index" v-for="subchild in child.children" :key="subchild.index">
                <a :href="subchild.path" class="link">
                    <i class="iconfont" v-if="subchild.meta.icon" :class="'icon-'+subchild.meta.icon"></i>
                    <span slot="title">{{subchild.meta.title}}</span>
                </a>
              </el-menu-item>
            </el-submenu>
            <!-- 没有三级导航 -->
            <el-menu-item :index="child.index" v-else :key="child.index">
              <a :href="child.path" class="link">
                  <i class="iconfont" v-if="child.meta.icon" :class="'icon-'+child.meta.icon"></i>
                  <span slot="title">{{child.meta.title}}</span>
              </a>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 导航-->
        <el-submenu :index="item.index" v-else  :key="item.index">
          <template slot="title">
            <i class="iconfont" v-if="item.meta.icon" :class="'icon-'+item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <template>
            <el-menu-item :index="item.index">
              <a :href="item.path" class="link">
                  <span slot="title">{{item.meta.title}}</span>
              </a>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
  </el-menu>
</template>
<script>
import Routes from '../data/route_navmenu.js';

export default {
  data(){
    return {
      routes: Routes(this.i18n),
      isCollapse:true,
      currentPath:"",
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    userId() {
      return this.userInfo.id || 0;
    },
  },
  created(){
    // 获取当前路径
    this.findCurrentPath(this.routes);
  },
  methods: {
    findCurrentPath(paths){
      if(!paths){return;}
      const currentRoute = location.pathname+location.hash;
      _.map(paths,(o)=>{
        if(o.path==currentRoute){
          this.currentPath=o.index;
        }else{
          this.findCurrentPath(o.children);
        }
      });
    },
    menuOpen(key, keyPath){

    },
    menuClose(key, keyPath){

    },
    hasOneShowingChildren(path,children) {
      // 只有一项的则不需要向下按钮
      if(!children||children.length<=0){
        return true;
      }
      return false
    }
  }
}
</script>
<style lang="less">
@import (reference) "../styles/common/color.less";
.el-menu{
  background-color:@color_333 !important;
  .el-menu-item{
    background-color:transparent !important;
    &:hover{background-color:@color_333_a8 !important;color:@color_aaa !important;}
  }
}
.navmenu{
  background-color:@color_333 !important;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  >.el-submenu{
    >.el-submenu__title{
      background-color:transparent !important;
      &:hover{background-color:@color_333_a8 !important;}
    }
  }
  .iconfont{color:inherit;}
  .link{display:block;}
}
</style>
