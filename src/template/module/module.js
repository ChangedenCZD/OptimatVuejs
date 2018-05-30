import {BaseModule, mapActions, mapGetters} from '../../lib/BaseModule';

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
    super.onCreate(this);
  }

  onMount() {
  }
}

module.exports = Module;
