import * as types from './mutation-types';

export const setAppConfig = ({ commit }, value) => {
  commit(types.SET_APP_CONFIG, value);
};
export const showToast = ({ commit }, toastContent, isShow) => {
  commit(types.SHOW_TOAST, toastContent, isShow);
};

// insert action
