import BaseClass from './BaseClass';
import {mapActions, mapGetters} from 'vuex';

class BaseModule extends BaseClass {
  constructor() {
    super();
    let self = this;
    this.app = null;
    this.data = function () {
      return self.getData();
    };
    this.created = function () {
      self.onCreate(self.app = this);
    };
    this.mounted = function () {
      self.onMount(self.app = this);
    };
    this.watch = {};
    this.methods = {};
    this.components = {};
    this.computed = {};
    this.props = [];
  }

  setProps(props) {
    this.props = props;
  }

  getData() {
    return {};
  }

  onCreate() {
  }

  onMount() {
  }

  setWatch(options) {
    this.watch = options || {};
  }

  setMethod(options) {
    this.methods = options || {};
  }

  setComponent(options) {
    this.components = options || {};
  }

  setCompute(options) {
    this.computed = options || {};
  }
}

module.exports = {
  BaseModule, mapActions, mapGetters
};
