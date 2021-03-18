
import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/pages/register';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/forgotPassword';
import ResetPassword from '@/pages/resetPassword';
import Home from '@/components/home';
import DashBoard from '@/pages/dashBoard';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/register',
			component: SignUp
		},
		{
			path: '/loginUser',
			name: Login,
			component: Login
		},
		{
			path: '/forgotPassword',
			component: ForgotPassword
		},
		{
			path: '/resetPassword/:token',
			component: ResetPassword
		},
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/dashBoard',
			component: DashBoard
		}
	],
	mode: 'history'
});

