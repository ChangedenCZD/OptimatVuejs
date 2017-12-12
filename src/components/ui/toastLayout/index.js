import {mapGetters, mapActions} from 'vuex';

const components = {};
const data = {
  isShow: false,
  content: '',
  timerId: null
};
const watch = {
  toastOptions(options) {
    options = options || {};
    let self = this;
    let isShow = self.isShow = options.isShow || false;
    let duration = options.duration;
    self.content = options.content || '';
    let timerId = self.timerId;
    if (timerId) {
      clearTimeout(timerId);
    }
    if (isShow) {
      self.setContentLayoutSize();
      self.timerId = setTimeout(() => {
        self.hideToast();
      }, duration);
    } else {
      self.hideToast();
    }
  }
};
const methods = {
  ...mapActions(['hideToast']),
  setContentLayoutSize() {
    this.$nextTick(() => {
      let el = this.$el.querySelector('.content');
      if (el) {
        let style = el.style;
        style.marginLeft = `${(this.windowWidth - el.offsetWidth) / 2}px`;
      }
    });
  }
};
const computed = {
  ...mapGetters({
    windowHeight: 'windowHeight',
    windowWidth: 'windowWidth',
    toastOptions: 'toastOptions'
  })
};
export default {
  data() {
    return data;
  },
  created() {
  },
  mounted() {
  },
  watch,
  methods,
  components,
  computed
};
