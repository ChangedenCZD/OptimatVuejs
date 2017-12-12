import api from '../../../api/index';
import co from 'co';
import {mapGetters, mapActions} from 'vuex';
import ToastLayout from '../../../components/ui/toastLayout/index.vue';
import LoadingLayout from '../../../components/ui/loadingLayout/index.vue';

const components = {ToastLayout, LoadingLayout};
const data = {};
const watch = {};
const methods = {
  ...mapActions(['showToast', 'hideToast', 'showLoading', 'hideLoading'])
};
const computed = {
  ...mapGetters({
    appConfig: 'appConfig'
  })
};
export default {
  data() {
    return data;
  },
  created() {
    let self = this;
    self.$nextTick(() => {
      api.demo().then((data) => {
        console.log(data);
        self.showToast({
          content: '请求成功',
          duration: 2500
        });
      }).catch((err) => {
        console.error(err);
        self.showToast({
          content: '请求错误',
          duration: 1400
        });
      });
    });
  },
  mounted() {
  },
  watch,
  methods,
  components,
  computed
};
