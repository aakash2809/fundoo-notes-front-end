/*************************************************************************
 * @file    : forgotPassword.spec.js
 * @purpose : to test forgotPassword component
 * @author  :  Aakash Rajak<aakashrajak2809@gmail.com>
 **************************************************************************/

import { createLocalVue, shallowMount } from '@vue/test-utils';
import forgotPassword from '../../src/pages/forgotPassword';
import Vuelidate from 'vuelidate';

/**
* @description test cases for forgotPassword.vue
*/
describe('forgotPassword.vue', () => {
	let wrapper;
	const localVue = createLocalVue();
	localVue.use(Vuelidate);

	wrapper = shallowMount(forgotPassword, {
		localVue
	});

	it('renders a vue instance', () => {
		expect(shallowMount(forgotPassword).isVueInstance()).toBe(true);
	});

	it('whenGivenEmailIsEmpity_shouldReturn_false', () => {
		wrapper.vm.form.email = '';
		expect(wrapper.vm.$v.form.email.required).toBe(false);
	});

	//Test cases for email id 
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
});

