import * as types from './mtypes';

export default {
  [types.SIDEBAR_OPEN](state) {
    state.isSidebarOpened = !state.isSidebarOpened;
  },
  [types.SIDEBAR_CLOSE](state){
    state.isSidebarOpened = false;
  },
  [types.DIALOG_AREA_TREE_OPEN](state,title){
    state.isShowAreaTreeDialog=true;
    state.treeTitle = title;
  },
  [types.DIALOG_AREA_TREE_CLOSE](state){
    state.isShowAreaTreeDialog=false;
  }
}
