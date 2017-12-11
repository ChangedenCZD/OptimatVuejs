import api from '../../api/index';
import co from 'co';
import { mapGetters, mapActions } from 'vuex';

const components = {};
const data = {};
const watch = {};
const methods = {
  ...mapActions(['showToast'])
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
  },
  mounted() {
  },
  watch,
  methods,
  components,
  computed
};
