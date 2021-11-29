import Vue from 'vue';
import App from './App';
import store from '../store';
import router from '../router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.mixin({
  methods: {
    getVariant(percent, inverse=false) {
      return !inverse
      ? (
        percent > 80
          ? "success"
          : percent > 60
            ? "info"
            : percent > 40
              ? "warning"
                : "danger"
      )
      : (
        percent > 80
          ? "danger"
          : percent > 60
            ? "warning"
            : percent > 40
              ? "info"
                : "success"
      );
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
