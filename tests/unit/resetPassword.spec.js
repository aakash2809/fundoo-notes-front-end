import { createLocalVue, shallowMount } from '@vue/test-utils';
import resetPassword from '../../src/pages/resetPassword';



import Vuelidate from 'vuelidate';

/**
* @description test cases for resetPassword.vue
*/
describe('resetPassword.vue', () => {
	let wrapper;
	const localVue = createLocalVue();
	localVue.use(Vuelidate);

	wrapper = shallowMount(resetPassword, {
		localVue
	});

	it('renders a vue instance', () => {
		expect(shallowMount(resetPassword).isVueInstance()).toBe(true);
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

	//test cases for newPassword
	it('whenGivenNewPasswordIsEmpity_shouldReturn_false', () => {
		wrapper.vm.form.newPassword = '';
		expect(wrapper.vm.$v.form.newPassword.required).toBe(false);
	});
	it('whenGivenNewPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
		wrapper.vm.form.newPassword = 'SUNCT$';
		expect(wrapper.vm.$v.form.newPassword.$invalid).toBe(true);
	});
	it('whenGivenNewPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
		wrapper.vm.form.newPassword = 'Sakk45sff5';
		expect(wrapper.vm.$v.form.newPassword.$invalid).toBe(true);
	});

	it('whenGivenNewPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
		wrapper.vm.form.newPassword = 'a@kk45sff5';
		expect(wrapper.vm.$v.form.newPassword.$invalid).toBe(true);
	});

	it('whenGivenNewPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
		wrapper.vm.form.newPassword = 'A@kksffslfjkj';
		expect(wrapper.vm.$v.form.newPassword.$invalid).toBe(true);
	});

	it('whenGivenNewPasswordIsValid_shouldReturn_falseForInvalid', () => {
		wrapper.vm.form.newPassword = 'Aad$ffjk34';
		expect(wrapper.vm.$v.form.newPassword.$invalid).toBe(false);
	});
});
