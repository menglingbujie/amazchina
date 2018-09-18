/**
 * Created by menglj on 2018/05/28.
 */

import _ from 'lodash';
import * as actions from './actions';
import state from './state';
import mutations from './mutations';
import * as getters from './getters';

export default {
  namespaced: true,
  
  state: _.cloneDeep(state),

  actions,
  
  mutations,
  
  getters,
};
