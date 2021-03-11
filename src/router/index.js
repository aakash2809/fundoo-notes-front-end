
import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/pages/register';
import Login from '@/pages/login';

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/register',
            name: 'Register',
            component: SignUp
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ],
    mode: 'history'
})