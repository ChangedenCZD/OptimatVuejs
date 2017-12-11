import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';

Vue.use(Vuex);
let state = {
  // insert state
  appConfig: null,
  isShowToast: false,
  toastContent: ''
};
let mutations = {
  // insert mutation
  [types.SET_APP_CONFIG](state, value) {
    state.appConfig = value;
  },
  [types.SHOW_TOAST](state, toastContent, isShow) {
    state.isShowToast = typeof isShow === 'boolean' ? isShow : !isShow;
    state.toastContent = toastContent;
  }
};
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
