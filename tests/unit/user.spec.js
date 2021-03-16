import { createLocalVue, shallowMount } from '@vue/test-utils'
import register from '../../src/pages/register'
import login from '../../src/pages/login'
import Vuelidate from "vuelidate";

/**
 * @description test cases for resgister.vue
 */
describe('register.vue', () => {
  let warpper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuelidate);
    warpper = shallowMount(register, localVue);
  });

  it('renders a vue instance', () => {
    expect(shallowMount(register).isVueInstance()).toBe(true);
  });

  //Test cases for firstName 
  it('whenGivenFirstNameIsEmpity_shouldReturn_falseValue', () => {
    warpper.vm.form.firstName = ''
    expect(warpper.vm.$v.form.firstName.required).toBe(false)
  });

  it('whenGivenFirstNameNotStartwithCapitalLeter_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.firstName = 'aakash'
    expect(warpper.vm.$v.form.firstName.$invalid).toBe(true)
  });

  it('whenGivenFirstNameLengthLessThanThree_shouldReturn_trueFalseForInvalid', () => {
    warpper.vm.form.firstName = 'Aa'
    expect(warpper.vm.$v.form.firstName.$invalid).toBe(true);
  });

  it('whenGivenFirstNameStartwithCapitalLeter_shouldReturn_falseFalseForInvalid', () => {
    warpper.vm.form.firstName = 'Aakash'
    expect(warpper.vm.$v.form.firstName.$invalid).toBe(false)
  })

  //Test cases for lastName 
  it('whenGivenLastNameIsEmpity_shouldReturn_falseValue', () => {
    warpper.vm.form.lastName = ''
    expect(warpper.vm.$v.form.lastName.required).toBe(false)
  });

  it('whenGivenLastNameNotStartwithCapitalLeter_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.lastName = 'rajak'
    expect(warpper.vm.$v.form.lastName.$invalid).toBe(true)
  });

  it('whenGivenLastNameLengthLessThanThree_shouldReturn_trueFalseForInvalid', () => {
    warpper.vm.form.lastName = 'Ra'
    expect(warpper.vm.$v.form.lastName.$invalid).toBe(true);
  });

  it('whenGivenFirstNameStartwithCapitalLeter_shouldReturn_falseFalseForInvalid', () => {
    warpper.vm.form.lastName = 'Rajak';
    expect(warpper.vm.$v.form.lastName.$invalid).toBe(false);
  })

  //Test cases for email id 
  it('whenGivenEmailIsEmpity_shouldReturn_false', () => {
    warpper.vm.form.email = ''
    expect(warpper.vm.$v.form.email.required).toBe(false)
  });

  it('whenGivenEmailIdNotContain@_shouldReturn_false', () => {
    warpper.vm.form.email = 'aakashgmail.com'
    expect(warpper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdNotHavingDotAfter@gmail_shouldReturn_false', () => {
    warpper.vm.form.email = 'aakash@gmail'
    expect(warpper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdNotHavingTextAfterDot_shouldReturn_false', () => {
    warpper.vm.form.email = 'aakash@gmail.'
    expect(warpper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdIvalid_shouldReturn_true', () => {
    warpper.vm.form.email = 'Kaaash@gmail.com'
    expect(warpper.vm.$v.form.email.email).toBe(true)
  });

  it('whenGivenEmailIdIWithUperCaseCharactor_shouldReturn_true', () => {
    warpper.vm.form.email = 'akaSh@gmail.com'
    expect(warpper.vm.$v.form.email.email).toBe(true)
  });

  //test cases for Password
  it('whenGivenPasswordIsEmpity_shouldReturn_false', () => {
    warpper.vm.form.password = ''
    expect(warpper.vm.$v.form.password.required).toBe(false);
  });
  it('whenGivenPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
    warpper.vm.form.password = 'SUNCT$'
    expect(warpper.vm.$v.form.password.$invalid).toBe(true);
  });
  it('whenGivenPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
    warpper.vm.form.password = 'Sakk45sff5'
    expect(warpper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.password = 'a@kk45sff5'
    expect(warpper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.password = 'A@kksffslfjkj'
    expect(warpper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordIsValid_shouldReturn_falseForInvalid', () => {
    warpper.vm.form.password = 'Aad$ffjk34'
    expect(warpper.vm.$v.form.password.$invalid).toBe(false);
  });

  //test cases for Confirm Password
  it('whenGivenConfirmPasswordIsEmpity_shouldReturn_false', () => {
    warpper.vm.form.cpassword = ''
    expect(warpper.vm.$v.form.password.required).toBe(false);
  });
  it('whenGivenConfirmPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
    warpper.vm.form.cpassword = 'SUNCT$'
    expect(warpper.vm.$v.form.cpassword.$invalid).toBe(true);
  });
  it('whenGivenConfirmPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
    warpper.vm.form.password = 'Sakk45sff5'
    expect(warpper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.password = 'a@kk45sff5'
    expect(warpper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
    warpper.vm.form.password = 'A@kksffslfjkj'
    expect(warpper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordIsValid_shouldReturn_falseForInvalid', () => {
    warpper.vm.form.cpassword = 'Aad@ffjk34'
    expect(warpper.vm.$v.form.cpassword.$invalid).toBe(false);
  });
})


/**
 * @description test cases for login.vue
 */
describe('login.vue', () => {
  let wrapper;
  const localVue = createLocalVue()
  localVue.use(Vuelidate);

  wrapper = shallowMount(login, {
    localVue
  });

  it('renders a vue instance', () => {
    expect(shallowMount(login).isVueInstance()).toBe(true);
  });

  //Test cases for email id 
  it('whenGivenEmailIsEmpity_shouldReturn_false', () => {
    wrapper.vm.form.email = ''
    expect(wrapper.vm.$v.form.email.required).toBe(false)
  });

  it('whenGivenEmailIdNotContain@_shouldReturn_false', () => {
    wrapper.vm.form.email = 'aakashgmail.com'
    expect(wrapper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdNotHavingDotAfter@gmail_shouldReturn_false', () => {
    wrapper.vm.form.email = 'aakash@gmail'
    expect(wrapper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdNotHavingTextAfterDot_shouldReturn_false', () => {
    wrapper.vm.form.email = 'aakash@gmail.'
    expect(wrapper.vm.$v.form.email.email).toBe(false)
  });

  it('whenGivenEmailIdIvalid_shouldReturn_true', () => {
    wrapper.vm.form.email = 'Kaaash@gmail.com'
    expect(wrapper.vm.$v.form.email.email).toBe(true)
  });

  it('whenGivenEmailIdIWithUperCaseCharactor_shouldReturn_true', () => {
    wrapper.vm.form.email = 'akaSh@gmail.com'
    expect(wrapper.vm.$v.form.email.email).toBe(true)
  });

  //test cases for Password
  it('whenGivenPasswordIsEmpity_shouldReturn_false', () => {
    wrapper.vm.form.password = ''
    expect(wrapper.vm.$v.form.password.required).toBe(false);
  });
  it('whenGivenPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
    wrapper.vm.form.password = 'SUNCT$'
    expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
  });
  it('whenGivenPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
    wrapper.vm.form.password = 'Sakk45sff5'
    expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.password = 'a@kk45sff5'
    expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.password = 'A@kksffslfjkj'
    expect(wrapper.vm.$v.form.password.$invalid).toBe(true);
  });

  it('whenGivenPasswordIsValid_shouldReturn_falseForInvalid', () => {
    wrapper.vm.form.password = 'Aad$ffjk34'
    expect(wrapper.vm.$v.form.password.$invalid).toBe(false);
  });
})
