const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const ApiSet = {
  DEMO: 'https://api.github.com/repos/axios/axios/issues'
};

function Options(url, data, method) {
  return {
    url: url,
    data: data || {},
    method: method || GET
  };
}

module.exports = {
  demo: (page) => {
    return new Options(ApiSet.DEMO, {per_page: page}, GET);
  }
  // insert api config
};
