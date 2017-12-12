import {mapGetters, mapActions} from 'vuex';
import BrowserUtils from '../../../utils/BrowserUtils';

const components = {};
const data = {
  supportCss3: true,
  deg: 0,
  isShow: false,
  timerId: null
};
const watch = {
  loadingOptions(options) {
    options = options || {};
    let self = this;
    let isShow = self.isShow = options.isShow || false;
    let duration = options.duration;
    let timerId = self.timerId;
    if (timerId) {
      clearTimeout(timerId);
    }
    if (isShow) {
      self.setSpinnerPosition();
      self.timerId = setTimeout(() => {
        self.hideLoading();
      }, duration);
    } else {
      self.hideLoading();
    }
  }
};
const methods = {
  ...mapActions(['hideLoading']),
  start() {
    let self = this;
    setInterval(() => {
      self.deg = (self.deg + 15) % 360;
    }, 1000 / 24);
  },
  setSpinnerPosition() {
    this.$nextTick(() => {
      let el = this.$el.querySelector('.spinner');
      if (el) {
        let style = el.style;
        style.margin = '0px';
        style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
        style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
      }
    });
  }
};
const computed = {
  ...mapGetters({
    windowHeight: 'windowHeight',
    windowWidth: 'windowWidth',
    loadingOptions: 'loadingOptions'
  })
};
export default {
  data() {
    return data;
  },
  created() {
    this.supportCss3 = BrowserUtils.cssSupports('transform') && BrowserUtils.cssSupports('animation') && BrowserUtils.cssSupports('animationDelay');
    if (!this.supportCss3) {
      this.start();
    }
  },
  mounted() {
  },
  watch,
  methods,
  components,
  computed
};
