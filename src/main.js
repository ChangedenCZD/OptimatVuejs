import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import Context from './lib/Context';

Vue.use(VueRouter);
require('assets/css/reset.css');

class Entry extends Context {
  constructor(myComponent) {
    super();
    this.components = {
      'myComponent': myComponent
    };
    this.el = '#app';
    this.store = store;
    this.router = new VueRouter({mode: 'history'});
    this.created = function () {
      const self = this;
      Vue.nextTick(() => {
        self.$nextTick(() => {
          Entry.BrowserUtils.registerGlobalApp(self);
          Entry.BrowserUtils.setWindowSize();
        });
      });
    };
    this.template = '<myComponent></myComponent>';
  }
}

module.exports = {
  createEntry: (myComponent) => {
    return new Vue(new Entry(myComponent));
  }
};
