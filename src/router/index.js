
import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/pages/register';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/forgotPassword';
import ResetPassword from '@/pages/resetPassword';
import Header from '@/components/header';
import DashBoard from '@/pages/dashBoard';
import SideNav from '@/components/sideNav';
import Note from '@/components/note';

import DashBoard1 from '@/pages/dashBoard1';
import Header1 from '@/components/header1';

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
			name: 'Header',
			component: Header
		},
		{
			path: '/dashBoard',
			component: DashBoard
		},
		{
			path: '/sideNav',
			component: SideNav
		},
		{
			path: '/note',
			component: Note
		},

		{
			path: '/dashBoard1',
			component: DashBoard1
		},
		{
			path: '/header1',
			name: 'Header1',
			component: Header1
		},
	],
	mode: 'history'
});

