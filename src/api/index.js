const ApiOptions = require('../lib/ApiOptions');
const config = require('./config');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
module.exports = {
  demo: (page) => {
    return new ApiOptions(config.DEMO, {per_page: page}, GET).request();
  }
};
