import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import * as types from './mutation-types';
import clone from 'clone';

const TOAST_DEFAULT_OPTIONS = {
  isShow: false,
  content: '请稍等...',
  duration: 1000
};
const LOADING_DEFAULT_OPTIONS = {
  isShow: false,
  duration: 60000
};
const WINDOW_DEFAULT_SIZE = {
  height: 400,
  width: 400
};
Vue.use(Vuex);
let state = {
  // insert state
  appConfig: null,
  toastOptions: TOAST_DEFAULT_OPTIONS,
  loadingOptions: LOADING_DEFAULT_OPTIONS,
  windowSize: WINDOW_DEFAULT_SIZE
};
let mutations = {
  // insert mutation
  [types.SET_APP_CONFIG](state, value) {
    state.appConfig = value;
  },
  [types.SHOW_TOAST] (state, options) {
    let defaultOptions;
    if (typeof options === 'string') {
      defaultOptions = clone(TOAST_DEFAULT_OPTIONS);
      defaultOptions.content = options;
    } else {
      defaultOptions = clone(options || TOAST_DEFAULT_OPTIONS);
    }
    defaultOptions.isShow = true;
    state.toastOptions = defaultOptions;
  },
  [types.HIDE_TOAST] (state) {
    state.toastOptions = TOAST_DEFAULT_OPTIONS;
  },
  [types.SHOW_LOADING] (state, options) {
    let defaultOptions;
    if (typeof options === 'number') {
      defaultOptions = clone(LOADING_DEFAULT_OPTIONS);
      defaultOptions.duration = options;
    } else {
      defaultOptions = clone(options || LOADING_DEFAULT_OPTIONS);
    }
    defaultOptions.isShow = true;
    state.loadingOptions = defaultOptions;
  },
  [types.HIDE_LOADING] (state) {
    state.loadingOptions = LOADING_DEFAULT_OPTIONS;
  },
  [types.SET_WINDOW_SIZE] (state, size) {
    state.windowSize = clone(size || WINDOW_DEFAULT_SIZE);
  }
};
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
