<template>
  <Container-Slot>
    <Header-Bar slot="header"></Header-Bar>
    <Side-Bar slot="slidbar"></Side-Bar>
    <slot name="content"></slot>
  </Container-Slot>
</template>
<script>
import ContainerSlot from "./ContainerSlot.vue";
import HeaderBar from "./HeaderBar.vue";
import SideBar from "./SideBar.vue";
export default {
  components:{ContainerSlot,HeaderBar,SideBar},
}
</script>
<style lang="less">
@import '../styles/common/icons.less';
@import '../styles/common/color.less';
.el-dialog{
  border-radius: 0;
  >.el-dialog__header{background-color:@color_f3f3f3;}
  >.el-dialog__body{padding:15px 30px;max-height:810px;overflow-y:auto;}
}
.el-table__header{.cell{color:@color_333;font-size:14px;font-weight:600;word-break: keep-all;}}
.el-table__body{.remark{white-space:nowrap;text-overflow: ellipsis;overflow:hidden;}}
.bar_search,.control_table{.el-col{width:auto !important;}}
.el-table tr{
  height: 40px;
  td,th { padding: 4px 0; }
}
.page {
  .bar_search.el-form--inline {
    padding-left: 5px;
    .el-form-item { margin-right: 5px; }
    .el-form-item__label {padding: 0 5px 0 15px;}
    .btn_group {padding-left: 15px;}
    .el-form-item--mini {
      .el-date-editor .el-range-separator {width: 15%;}
    }
  }
  .control_table .el-form--inline {
    .el-form-item { margin-right: 5px; }
    .btn_group {padding-left: 15px;}
  }
}

</style>
