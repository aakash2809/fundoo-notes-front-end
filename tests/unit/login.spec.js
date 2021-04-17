/*************************************************************************
 * @file    : login.spec.js
 * @purpose : to test login component
 * @author  :  Aakash Rajak<aakashrajak2809@gmail.com>
 **************************************************************************/

import { createLocalVue, shallowMount } from '@vue/test-utils';
import login from '../../src/pages/login';
import Vuelidate from 'vuelidate';

/**
 * @description test cases for login.vue
 */
describe('login.vue', () => {
	let wrapper;
	const localVue = createLocalVue();
	localVue.use(Vuelidate);

	wrapper = shallowMount(login, {
		localVue
	});

	it('renders a vue instance', () => {
		expect(shallowMount(login).isVueInstance()).toBe(true);
	});

	//Test cases for email id 
	it('whenGivenEmailIsEmpity_shouldReturn_false', () => {
		wrapper.vm.form.email = '';
		expect(wrapper.vm.$v.form.email.required).toBe(false);
	});

	it('whenGivenEmailIdNotContain@_shouldReturn_false', () => {
		wrapper.vm.form.email = 'aakashgmail.com';
		expect(wrapper.vm.$v.form.email.email).toBe(false);
	});

	it('whenGivenEmailIdNotHavingDotAfter@gmail_shouldReturn_false', () => {
		wrapper.vm.form.email = 'aakash@gmail';
		expect(wrapper.vm.$v.form.email.email).toBe(false);
	});

	it('whenGivenEmailIdNotHavingTextAfterDot_shouldReturn_false', () => {
		wrapper.vm.form.email = 'aakash@gmail.';
		expect(wrapper.vm.$v.form.email.email).toBe(false);
	});

	it('whenGivenEmailIdIvalid_shouldReturn_true', () => {
		wrapper.vm.form.email = 'Kaaash@gmail.com';
		expect(wrapper.vm.$v.form.email.email).toBe(true);
	});

	it('whenGivenEmailIdIWithUperCaseCharactor_shouldReturn_true', () => {
		wrapper.vm.form.email = 'akaSh@gmail.com';
		expect(wrapper.vm.$v.form.email.email).toBe(true);
	});

	//test cases for Password
	it('whenGivenPasswordIsEmpity_shouldReturn_false', () => {
		wrapper.vm.form.password = '';
		expect(wrapper.vm.$v.form.password.required).toBe(false);
	});
	it('whenGivenPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
		wrapper.vm.form.password = 'SUNCT$';
		expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
	});
	it('whenGivenPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
		wrapper.vm.form.password = 'Sakk45sff5';
		expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
	});

	it('whenGivenPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
		wrapper.vm.form.password = 'a@kk45sff5';
		expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
	});

	it('whenGivenPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
		wrapper.vm.form.password = 'A@kksffslfjkj';
		expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
	});

	it('whenGivenPasswordIsValid_shouldReturn_falseForInvalid', () => {
		wrapper.vm.form.password = 'Aad$ffjk34';
		expect(wrapper.vm.$v.form.password.$invalid).toBe(false);
	});
});

