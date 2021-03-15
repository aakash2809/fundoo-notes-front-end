import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './services/axios.config'

Vue.use(router);

Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



