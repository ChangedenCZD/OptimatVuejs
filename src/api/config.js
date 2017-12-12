import ApiOptions from '../lib/ApiOptions';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const ApiSet = {
  DEMO: 'https://api.github.com/repos/axios/axios/issues'
};

module.exports = {
  demo: (page) => {
    return new ApiOptions(ApiSet.DEMO, {per_page: page}, GET);
  }
  // insert api config
};
