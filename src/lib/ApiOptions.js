/* eslint-disable no-return-await */
const axios = require('axios');

class ApiOptions {
  constructor(url, method) {
    this.globalApp = null;
    this.isSilence = false;
    this.options = {
      url,
      method,
      timeout: 60000,
      maxContentLength: 3145728
    };
  }

  setData(data) {
    this.options.data = data || {};
    return this;
  }

  /**
   * 添加params
   * */
  setParams(params) {
    this.options.params = params || {};
    return this;
  }

  /**
   * 设置为静默模式，不显示加载动画
   * */
  setSilence(isSilence) {
    this.isSilence = isSilence || false;
    return this;
  }

  setHeaders(headers) {
    this.options.headers = headers || {};
    return this;
  }

  showLoading() {
    let globalApp = this.globalApp;
    if (globalApp) {
      globalApp.$store.dispatch('showLoading', {
        duration: 60000
      });
    }
  }

  hideLoading() {
    let globalApp = this.globalApp;
    if (globalApp) {
      globalApp.$store.dispatch('hideLoading');
    }
  }

  getGlobalApp() {
    if (!this.globalApp) {
      this.globalApp = window.globalApp;
    }
  }

  request(returnPromise = false) {
    let self = this;
    self.getGlobalApp();
    let isSilence = self.isSilence;
    if (!isSilence) {
      self.showLoading();
    }
    const promise = new Promise((resolve, reject) => {
      const options = self.options;
      axios.request(options).then(response => {
        if (!isSilence) {
          self.hideLoading();
        }
        if (response.status < 400) {
          resolve(response.data);
        } else {
          throw new Error(response);
        }
      }).catch(err => {
        if (!isSilence) {
          self.hideLoading();
        }
        reject(err);
      });
    });
    if (returnPromise) {
      return promise;
    } else {
      return (async () => {
        return await promise;
      })();
    }
  }
}

module.exports = ApiOptions;
