import { createLocalVue, shallowMount } from '@vue/test-utils'
import register from '../../src/pages/register'
import login from '../../src/pages/login'
import forgotPassword from '../../src/pages/forgotPassword'
import Vuelidate from "vuelidate";

/**
 * @description test cases for resgister.vue
 */
describe('register.vue', () => {
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuelidate);
    wrapper = shallowMount(register, localVue);
  });

  it('renders a vue instance', () => {
    expect(shallowMount(register).isVueInstance()).toBe(true);
  });

  //Test cases for firstName 
  it('whenGivenFirstNameIsEmpity_shouldReturn_falseValue', () => {
    wrapper.vm.form.firstName = ''
    expect(wrapper.vm.$v.form.firstName.required).toBe(false)
  });

  it('whenGivenFirstNameNotStartwithCapitalLeter_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.firstName = 'aakash'
    expect(wrapper.vm.$v.form.firstName.$invalid).toBe(true)
  });

  it('whenGivenFirstNameLengthLessThanThree_shouldReturn_trueFalseForInvalid', () => {
    wrapper.vm.form.firstName = 'Aa'
    expect(wrapper.vm.$v.form.firstName.$invalid).toBe(true);
  });

  it('whenGivenFirstNameStartwithCapitalLeter_shouldReturn_falseFalseForInvalid', () => {
    wrapper.vm.form.firstName = 'Aakash'
    expect(wrapper.vm.$v.form.firstName.$invalid).toBe(false)
  })

  //Test cases for lastName 
  it('whenGivenLastNameIsEmpity_shouldReturn_falseValue', () => {
    wrapper.vm.form.lastName = ''
    expect(wrapper.vm.$v.form.lastName.required).toBe(false)
  });

  it('whenGivenLastNameNotStartwithCapitalLeter_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.lastName = 'rajak'
    expect(wrapper.vm.$v.form.lastName.$invalid).toBe(true)
  });

  it('whenGivenLastNameLengthLessThanThree_shouldReturn_trueFalseForInvalid', () => {
    wrapper.vm.form.lastName = 'Ra'
    expect(wrapper.vm.$v.form.lastName.$invalid).toBe(true);
  });

  it('whenGivenFirstNameStartwithCapitalLeter_shouldReturn_falseFalseForInvalid', () => {
    wrapper.vm.form.lastName = 'Rajak';
    expect(wrapper.vm.$v.form.lastName.$invalid).toBe(false);
  })

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

  //test cases for Confirm Password
  it('whenGivenConfirmPasswordIsEmpity_shouldReturn_false', () => {
    wrapper.vm.form.cpassword = ''
    expect(wrapper.vm.$v.form.password.required).toBe(false);
  });
  it('whenGivenConfirmPasswordlengthLessThenEightcharactor_shouldReturn_trueForInvalidInput', () => {
    wrapper.vm.form.cpassword = 'SUNCT$'
    expect(wrapper.vm.$v.form.cpassword.$invalid).toBe(true);
  });
  it('whenGivenConfirmPasswordNotContainSpecialCharactor_shouldReturn_trueForInvalidInput', () => {
    wrapper.vm.form.password = 'Sakk45sff5'
    expect(wrapper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordNotContainAtleastOneUperCaseCharactor_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.password = 'a@kk45sff5'
    expect(wrapper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordNotContainAnyDigit_shouldReturn_trueForInvalid', () => {
    wrapper.vm.form.password = 'A@kksffslfjkj'
    expect(wrapper.vm.$v.form.cpassword.$invalid).toBe(true);
  });

  it('whenGivenConfirmPasswordIsValid_shouldReturn_falseForInvalid', () => {
    wrapper.vm.form.cpassword = 'Aad@ffjk34'
    expect(wrapper.vm.$v.form.cpassword.$invalid).toBe(false);
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

  /**
 * @description test cases for forgotPassword.vue
 */
  describe('forgotPassword.vue', () => {
    let wrapper;
    const localVue = createLocalVue()
    localVue.use(Vuelidate);

    wrapper = shallowMount(forgotPassword, {
      localVue
    });

    it('renders a vue instance', () => {
      expect(shallowMount(forgotPassword).isVueInstance()).toBe(true);
    });

    it('whenGivenEmailIsEmpity_shouldReturn_false', () => {
      wrapper.vm.form.email = ''
      expect(wrapper.vm.$v.form.email.required).toBe(false)
    });

    //Test cases for email id 
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

  });

})
