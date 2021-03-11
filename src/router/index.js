
import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/pages/register';
import Login from '@/pages/login';



export default new Router({
    routes: [

        {
            path: '/register',
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

Vue.use(Router)