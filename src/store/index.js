import Vue from 'vue';
import Vuex from 'vuex';

import Note from "./modules/note.js";
//import Snackbar from "./modules/snackBar.js";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {


    },
    mutations: {

    },
    actions: {

    },
    modules: {
        Note,
        //Snackbar
    }
});
