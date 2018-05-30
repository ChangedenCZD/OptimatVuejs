import ToastLayout from 'optimat-vue-toast';
import LoadingLayout from 'optimat-vue-loading';
import AlertDialog from 'optimat-vue-alert-dialog';
import ConfirmDialog from 'optimat-vue-confirm-dialog';
import InputDialog from 'optimat-vue-input-dialog';
import SelectorDialog from 'optimat-vue-selector-dialog';
import {BaseModule, mapActions, mapGetters} from '../../../lib/BaseModule';
import co from 'co';

class Module extends BaseModule {
  constructor() {
    super();
    const api = this.Api;
    this.setComponent({ToastLayout, LoadingLayout, AlertDialog, ConfirmDialog, InputDialog, SelectorDialog});
    this.setMethod({
      ...mapActions(['showToast', 'hideToast', 'showLoading', 'hideLoading']),
      request(page) {
        const self = this;
        co(function* () {
          const res = yield api.demo(page);
          console.log(res);
          self.showToast({
            content: '请求成功',
            duration: 2500
          });
          self.selectorDialogOptions = {
            isShow: true,
            title: '输入用户名',
            content: '请输入用户名。',
            selectItem: ['选项0', '选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9'],
            maxCount: 3,
            onHide: () => {
              self.selectorDialogOptions = {
                isShow: false
              };
            },
            onConfirm: (itemList) => {
              console.log('onConfirm', itemList);
            },
            onCancel: () => {
              console.log('onCancel');
            }
          };
        }).catch((err) => {
          console.error(err);
          self.showToast({
            content: '请求错误',
            duration: 1400
          });
          self.alertDialogOptions = {
            isShow: true,
            title: '抱歉',
            content: '请求错误。'
          };
        });
      }
    });
    this.setCompute({
      ...mapGetters({})
    });
  }

  getData() {
    return {
      alertDialogOptions: {
        isShow: false
      },
      confirmDialogOptions: {
        isShow: false
      },
      inputDialogOptions: {
        isShow: false
      },
      selectorDialogOptions: {
        isShow: false
      }
    };
  }

  onCreate() {
    let self = this;
    let app = self.app;
    app.$nextTick(() => {
      app.request(1);
      /* self.Api.demo(1).then((data) => {
        console.log(data);
        app.showToast({
          content: '请求成功',
          duration: 2500
        });
        app.selectorDialogOptions = {
          isShow: true,
          title: '输入用户名',
          content: '请输入用户名。',
          selectItem: ['选项0', '选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9'],
          maxCount: 3,
          onHide: () => {
            app.selectorDialogOptions = {
              isShow: false
            };
          },
          onConfirm: (itemList) => {
            console.log('onConfirm', itemList);
          },
          onCancel: () => {
            console.log('onCancel');
          }
        };
      }).catch((err) => {
        console.error(err);
        app.showToast({
          content: '请求错误',
          duration: 1400
        });
        app.alertDialogOptions = {
          isShow: true,
          title: '抱歉',
          content: '请求错误。'
        };
      }); */
    });
  }
}

module.exports = Module;
