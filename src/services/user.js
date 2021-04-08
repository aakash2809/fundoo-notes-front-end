import axios from "axios";

export default {
    registerUser(userDetail) {
        return axios.post("/register", userDetail);
    },

    loginUser(loginCredentials) {
        return axios.post("/login", loginCredentials);
    },

    forgotPassword(emailId) {
        return axios.post("/forgotPassword", emailId);
    },

    resetPassword(detailForResetPassword) {
        return axios.put("/resetPassword", detailForResetPassword);
    },

    addNote(noteDetail) {
        return axios.post("/addNote", noteDetail);
    },

    fetchAllNotes() {
        return axios.get("/allNotes");
    },

    removeNote(noteId) {
        return axios.put(`/notes/delete/${noteId}`);
    },

    editNoteData(noteId, noteData) {
        return axios.put(`/updateNote/${noteId}`, noteData);
    },

    restoreNote(noteId) {
        return axios.put(`/notes/restore/${noteId}`);
    },

    unArchieveNote(noteId) {
        return axios.put(`/notes/unarchive/${noteId}`);
    },

    deleteNoteForever(noteId) {
        return axios.delete(`/notes/deleteforever/${noteId}`);
    },

    archiveNoteData(noteId) {
        return axios.put(`/notes/archive/${noteId}`);
    },
}



