import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import './services/axios.config';
import vuetify from './plugins/vuetify';
import store from './store'

Vue.use(router);

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(vuetify);
new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app');



