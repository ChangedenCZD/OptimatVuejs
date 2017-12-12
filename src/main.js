import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import BaseClass from './lib/BaseClass';
import {BaseModule, mapActions, mapGetters} from './lib/BaseModule';
import BrowserUtils from './utils/BrowserUtils';

const router = new VueRouter({mode: 'history'});
require('assets/css/reset.css');

function beforeCreate(app) {
  console.log('beforeCreate');
  BrowserUtils.registerGlobalApp(app);
  BrowserUtils.setWindowSize();
}

class Entry extends BaseClass {
  constructor(myComponent) {
    super();
    this.components = {
      'myComponent': myComponent
    };
    this.el = '#app';
    this.store = store;
    this.router = router;
    this.created = function () {
      let self = this;
      Vue.nextTick(() => {
        beforeCreate(self);
      });
    };
    this.template = '<myComponent></myComponent>';
  }
}

function createEntry(myComponent) {
  return new Vue(new Entry(myComponent));
}

module.exports = {
  store: store,
  router: router,
  beforeCreate: beforeCreate,
  Vue: Vue,
  Entry: Entry,
  BaseModule: BaseModule,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createEntry: createEntry
};
