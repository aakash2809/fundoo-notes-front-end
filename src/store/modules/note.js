import userServices from '../../services/user';

const state = {
    notes: [],
};
const getters = {
    allActiveNotes: state => {
        return state.notes.filter(note =>
            (note.isDeleted == false && note.isArchived == false));
    },

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

    getAllNotes({ commit }) {
        userServices
            .fetchAllNotes()
            .then((result) => {
                console.log("response : ", result.data);
                commit('setAllNotes', result.data.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

const mutations = {
    setAllNotes: (state, notes) => (state.notes = notes),
};

export default {
    state,
    getters,
    actions,
    mutations,
};