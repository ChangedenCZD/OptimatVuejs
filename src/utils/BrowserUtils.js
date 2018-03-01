let globalApp = null;
const cssSupports = (() => {
  let div = document.createElement('div');
  let vendors = ['Khtml', 'O', 'Moz', 'Webkit'];
  let len = vendors.length;
  return function (prop) {
    if (prop in div.style) {
      return true;
    }
    if ('-ms-' + prop in div.style) {
      return true;
    }
    prop = prop.replace(/^[a-z]/, (val) => {
      return val.toUpperCase();
    });
    while (len--) {
      if (vendors[len] + prop in div.style) {
        return true;
      }
    }
    return false;
  };
})();
const setWindowSize = () => {
  globalApp.$store.dispatch('setWindowSize', {
    height: window.innerHeight,
    width: window.innerWidth
  });
};
const registerGlobalApp = (app) => {
  globalApp = window.globalApp = app;
};
module.exports = {cssSupports, setWindowSize, registerGlobalApp};
