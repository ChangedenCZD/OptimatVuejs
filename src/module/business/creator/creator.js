import main from '../../../main';
import myComponent from './module.vue';

const Vue = main.Vue;
let app = new Vue({
  el: '#app',
  store: main.store,
  router: main.router,
  created: () => {
    Vue.nextTick(() => {
      main.beforeCreate(app);
    });
  },
  template: '<myComponent></myComponent>',
  components: {
    'myComponent': myComponent
  }
});
