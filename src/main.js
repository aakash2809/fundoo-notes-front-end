import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
//import axios from 'axios'

Vue.use(router);
/* import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify) */
//axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')



