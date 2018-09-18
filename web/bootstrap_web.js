/**
 * pc端公共区域
 */
import './bootstrap';
import Vue from 'vue';

import './styles/common/common.less';

import ElementUI from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import './styles/ui_theme/elementui/index.css';

Vue.use(ElementUI);

if(window.AmazChina.initalState.lang=="en") {
  locale.use(lang);
}

import LayoutFrame from "./layout/LayoutFrame.vue";
import DialogAreaTree from "./dialog/DialogAreaTree.vue";
Vue.mixin({
  components: { LayoutFrame,DialogAreaTree }
});
