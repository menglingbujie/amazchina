
import * as types from './mtypes';
export const toggleSidebar = (context) => {
  context.commit(types.SIDEBAR_OPEN);
}
export const closeSideBar = (context) =>{
  context.commit(types.SIDEBAR_CLOSE);
}
export const openAreaTreeDialog = (context,title) =>{
  context.commit(types.DIALOG_AREA_TREE_OPEN, title);
}
export const closeAreaTreeDialog = (context) =>{
  context.commit(types.DIALOG_AREA_TREE_CLOSE);
}