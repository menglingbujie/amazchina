<template>
  <el-alert
  :title="title"
  type="error"
  :closable="false">
  </el-alert>
</template>

<script>
export default {
  props: ["title"]
}
</script>

<style lang="less">
</style>
