/*************************************************************************
 * @file  : archive.spec.js
 * @purpose : to test archieve component
 * @author:  Aakash Rajak<aakashrajak2809@gmail.com>
 **************************************************************************/

import Archieved from '../../src/components/archive.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('archieved.vue', () => {
    let getters
    let store

    beforeEach(() => {

        getters = {
            allArchievedNotes: () => [{
                _id: ObjectId("6079fcca7b125b185c501879"),
                labelId: [],
                isArchived: false,
                isDeleted: true,
                collaborator: [],
                title: "test second ",
                description: "to check",
                userId: ObjectId("604ebbc14711870344436aaa"),
                createdAt: ISODate("2021-04-16T21:08:26.479Z"),
                updatedAt: ISODate("2021-04-16T21:08:47.521Z")
            }]
        }
        store = new Vuex.Store({
            getters
        })
    })

    it('mounts and renders', () => {
        const wrapper = shallowMount(Archieved, { store, localVue })
        expect(wrapper.html()).toBeTruthy();
    });
})