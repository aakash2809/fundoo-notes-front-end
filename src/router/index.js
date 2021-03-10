
import Vue from 'vue'
import Router from 'vue-router'

import SignUp from '@/components/SignUp';

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/register',
            name: 'Register',
            component: SignUp
        }
    ]
})