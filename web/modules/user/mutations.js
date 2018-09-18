import * as types from './mtypes';
import initState from './state';
export default {
  // 用户信息
  [types.UPDATE_USER_INFO](state, info) {
    state.userInfo = _.assign(state.userInfo, info);
  },
  // 重置用户信息
  [types.RESET_USER_INFO](state) {
    state.userInfo = _.cloneDeep(initState.userInfo);
  },
}
