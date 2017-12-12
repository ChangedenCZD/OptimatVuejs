const CONFIG = require('./config');

module.exports = {
  demo: (page) => {
    return CONFIG.demo(page).request();
  }
  // insert api
};
