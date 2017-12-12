import {mapActions, mapGetters} from 'vuex';
import BaseModule from '../../lib/BaseModule';

class Component extends BaseModule {
  constructor() {
    super();
    this.setComponent({});
    this.setMethod({
      ...mapActions([])
    });
    this.setCompute({
      ...mapGetters({})
    });
    this.setWatch({});
  }

  getData() {
    return {};
  }

  onCreate() {
  }

  onMount() {
  }
}

module.exports = Component;
