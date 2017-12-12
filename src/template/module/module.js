import {BaseModule, mapGetters, mapActions} from '../../lib/BaseModule';

class Module extends BaseModule {
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

module.exports = Module;
