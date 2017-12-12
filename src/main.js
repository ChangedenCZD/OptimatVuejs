import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import BrowserUtils from './utils/BrowserUtils';

require('assets/css/reset.css');

function beforeCreate(app) {
  console.log('beforeCreate');
  BrowserUtils.registerGlobalApp(app);
  BrowserUtils.setWindowSize();
}

module.exports = {
  store: store, router: new VueRouter({mode: 'history'}), beforeCreate: beforeCreate, Vue: Vue
};
