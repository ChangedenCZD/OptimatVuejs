const CONFIG = require('./config');
const axios = require('axios');
let globalApp = null;

function showLoading() {
  globalApp.$store.dispatch('showLoading', {
    duration: 60000
  });
}

function hideLoading() {
  globalApp.$store.dispatch('hideLoading');
}

function getGlobalApp() {
  if (!globalApp) {
    globalApp = window.globalApp;
  }
}

function request(options) {
  getGlobalApp();
  showLoading();
  return new Promise((resolve, reject) => {
    axios.request(options).then(response => {
      hideLoading();
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(err => {
      hideLoading();
      reject(err);
    });
  });
}

module.exports = {
  demo: (page) => {
    return request(CONFIG.demo(page));
  }
  // insert api
};
