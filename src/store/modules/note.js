import userServices from '../../services/user';

const state = {
    notes: [],
    //navBarOption: Boolean
};
const getters = {
    /*  allActiveNotes: state => {
         return state.notes.filter(note =>
             (note.isDeleted == false && note.isArchived == false));
     }, */

    allArchivedNotes: state => {
        return state.notes.filter(note =>
            (note.isArchived == true));
    },

    allTrashNotes: state => {
        return state.notes.filter(note =>
            (note.isDeleted == true));
    }
};

const actions = {

    /* changeAddNote({ commit }) {
        this.navBarOption = false
        commit("changeAddNote", this.navBarOption)
    }, */

    getAllNotes({ commit }) {
        userServices
            .fetchAllNotes()
            .then((result) => {
                console.log("response : ", result.data);
                commit('setAllNotes', result.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    /* addNote({ commit }, noteData) {
        userServices.createNote(noteData).then(result => {
            this.result = result.data.data;
            commit('SHOW_MESSAGE', {
                text: 'Successfully added new Note',
                timeout: 2000
            });
            commit('newNote', this.result);
        }).catch(() => {
            commit('SHOW_MESSAGE', {
                text: 'Error while adding new Note',
                timeout: 2000
            });
        });
    },
 */
    /* trashNote({ commit }, id) {
        const noteInput = {
            isDeleted: true
        };
        console.log('noteData, id', id, noteInput);
        return userServices.moveToTrash(noteInput, id).then(result => {
            this.result = result.data.data;
            console.log('Moved To trash', result);
            commit('SHOW_MESSAGE', {
                text: 'Moved To trash',
                timeout: 2000
            });
            console.log("get all")
        }).catch(() => {
            commit('SHOW_MESSAGE', {
                text: 'Error, while trashing!',
                timeout: 2000
            });
        });
    } */
};

const mutations = {
    setAllNotes: (state, notes) => (state.notes = notes),
    // newNote: (state, noteData) => state.notes.unshift(noteData),
    //changeAddNote: (state, navBarOption) => (state.navBarOption = navBarOption),
};

export default {
    state,
    getters,
    actions,
    mutations,
};