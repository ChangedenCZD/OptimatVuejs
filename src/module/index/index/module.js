import ToastLayout from '../../../components/ui/toastLayout/index.vue';
import LoadingLayout from '../../../components/ui/loadingLayout/index.vue';
import {BaseModule, mapGetters, mapActions} from '../../../lib/BaseModule';

class Module extends BaseModule {
  constructor() {
    super();
    this.setComponent({ToastLayout, LoadingLayout});
    this.setMethod({
      ...mapActions(['showToast', 'hideToast', 'showLoading', 'hideLoading'])
    });
    this.setCompute({
      ...mapGetters({})
    });
  }

  getData() {
    return {};
  }

  onCreate() {
    let self = this;
    self.app.$nextTick(() => {
      self.Api.demo(1).then((data) => {
        console.log(data);
        self.app.showToast({
          content: '请求成功',
          duration: 2500
        });
      }).catch((err) => {
        console.error(err);
        self.app.showToast({
          content: '请求错误',
          duration: 1400
        });
      });
    });
  }
}

module.exports = Module;
