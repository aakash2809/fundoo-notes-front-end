import { createLocalVue, shallowMount } from '@vue/test-utils'
import register from '../../src/pages/register'
import Vuelidate from "vuelidate";

describe('register.vue', () => {
  let warpper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuelidate);
    warpper = shallowMount(register, localVue);
  })
  it('whenGivenFirstNameNotStartwithCapitalLeter_shouldReturn_falseValue', () => {
    warpper.$v.firstName = 'aakash'
    console.log(warpper.$v.firstName);
    expect(warpper.$v.firstName).toBe(false)
  })
})
