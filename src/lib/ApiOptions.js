const axios = require('axios');

class ApiOptions {
  constructor(url, data, method) {
    this.globalApp = null;
    this.options = {
      url, data, method
    };
  }

  showLoading() {
    this.globalApp.$store.dispatch('showLoading', {
      duration: 60000
    });
  }

  hideLoading() {
    this.globalApp.$store.dispatch('hideLoading');
  }

  getGlobalApp() {
    if (!this.globalApp) {
      this.globalApp = window.globalApp;
    }
  }

  request() {
    let self = this;
    self.getGlobalApp();
    self.showLoading();
    return new Promise((resolve, reject) => {
      axios.request(self.options).then(response => {
        self.hideLoading();
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }).catch(err => {
        self.hideLoading();
        reject(err);
      });
    });
  }
}

module.exports = ApiOptions;
