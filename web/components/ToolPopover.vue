<template>
  <el-popover
    :placement="placement"
    :title="title"
    trigger="hover"
    :content="content"
    popper-class="tool-provoer-container">
    <slot name="content"></slot>
    <i slot="reference" style="color:#aaa;font-weight:500;" class="iconfont icon-question el-porover-icon"></i>
  </el-popover>
</template>
<style lang='less'>
.tool-provoer-container {
  min-width: 200px;
  max-width: 350px;
  padding: 10px 20px;
  .slot-content { text-align: center; }
  .tool-provoer-content { text-align: left; }
  .el-porover-icon { cursor: pointer;}
}
</style>
<script>

  export default {
    props: {
      placement: {
        type: String,
        default: "bottom-start",
      },
      title: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  }
</script>
