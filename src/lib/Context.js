import Api from '../api';

class BaseClass {
  constructor() {
    this.context = {
      Api: Api
    };
  }

  get Api() {
    return this.context.Api;
  }
}

module.exports = BaseClass;
