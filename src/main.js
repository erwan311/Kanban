import Vue from 'vue';
import App from './App.vue';
import vueKanban from 'vue-kanban';
import materialize_css from 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import "vue-material-design-icons/styles.css";

Vue.use(vueKanban);
Vue.use(materialize_css);
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
}).$mount('#app');
