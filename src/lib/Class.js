const BrowserUtils = require('../utils/BrowserUtils');
const clone = require('clone');

class Class {
  static get BrowserUtils() {
    return BrowserUtils;
  }

  static to(url) {
    BrowserUtils.to(url);
  }

  static open(url) {
    BrowserUtils.open(url);
  }

  static back() {
    BrowserUtils.back();
  }

  static canBack() {
    return BrowserUtils.canBack();
  }

  static getValidParam(param) {
    return BrowserUtils.getValidParam(param);
  }

  static reload() {
    BrowserUtils.reload();
  }

  static setTitle(title) {
    BrowserUtils.setTitle(title);
  }

  static isSupportCss() {
    return BrowserUtils.cssSupports;
  }

  static clone(object) {
    return clone(object);
  }

  static stdout(message) {
    BrowserUtils.stdout(message);
  }

  static computeRemScale() {
    BrowserUtils.computeRemScale();
  }
}

module.exports = Class;
