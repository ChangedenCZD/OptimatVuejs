import * as types from './mutation-types';

export const setAppConfig = ({commit}, value) => {
  commit(types.SET_APP_CONFIG, value);
};
export const showToast = ({commit}, options) => {
  commit(types.SHOW_TOAST, options);
};
export const hideToast = ({commit}) => {
  commit(types.HIDE_TOAST);
};
export const setWindowSize = ({commit}, size) => {
  commit(types.SET_WINDOW_SIZE, size);
};
export const showLoading = ({commit}, options) => {
  commit(types.SHOW_LOADING, options);
};
export const hideLoading = ({commit}) => {
  commit(types.HIDE_LOADING);
};
// insert action
