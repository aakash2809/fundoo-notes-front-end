/*************************************************************************
 * @file : snackBar.spec.js
 * @purpose : to test snackBar component
 * @author :  Aakash Rajak<aakashrajak2809@gmail.com>
 * @since : 
 **************************************************************************/

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex'
import snackbar from '../../src/components/snackBarNotify.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe('snackbar.vue', () => {
    let wrapper;
    let actions
    let store

    beforeEach(() => {
        wrapper = shallowMount(snackbar, {
            store,
            localVue,
        })
        actions = {
            actionClick: jest.fn(),
            actionInput: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
    });

    it('mounts and renders', () => {
        expect(wrapper.html()).toBeTruthy();
    });

    it('has data', () => {
        expect(typeof snackbar.data).toBe('function');
    });
});