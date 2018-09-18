<template>
  <el-container class="container">
    <slot name="dialog"></slot>
    <el-header class="header">
      <slot name="header"></slot>
    </el-header>
    <el-container>
      <slot name="slidbar"></slot>
      <slot></slot>
    </el-container>
  </el-container>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
@import "../styles/common/color.less";
.container{
  height:inherit;
  >.header{
    margin:0;padding:0;height:auto !important;
    background-color:@color_32c5d2;
  }
}
</style>
