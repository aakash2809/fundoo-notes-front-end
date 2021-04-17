
import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/pages/register';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/forgotPassword';
import ResetPassword from '@/pages/resetPassword';
import Header from '@/components/header';
import DashBoard from '@/pages/dashBoard';
import PageNotFound from '@/components/pageNotFound.vue';

function lazyLoad(view) {
	return () => import(`@/components/${view}.vue`)
}

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
			name: Login,
			component: Login
		},

		{
			path: '/dashBoard',
			component: DashBoard,
			children: [
				{
					path: 'header',
					name: 'Header',
					component: Header
				},
				{
					path: '/dashBoard/:id',
					component: lazyLoad('sideNav')

				},
				{
					path: 'note',
					component: lazyLoad('note')

				}
			]
		},
		{ path: "*", component: PageNotFound }
	],
	mode: 'history'
});

