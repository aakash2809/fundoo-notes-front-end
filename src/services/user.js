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
        return axios.delete(`/note/${noteId}`);
    },

    editNoteData(noteId, noteData) {
        return axios.put(`/updateNote/${noteId}`, noteData);
    },

    deleteForever(noteId) {
        const noteData = {
            endPoint: '/notes/deleteforever/' + noteId
        };
        return axios.delete(noteData);
    },

    restoreNote(noteId) {
        return axios.put(`/notes/restore/${noteId}`);
    },

    unArchieveNote(noteId) {
        return axios.put(`/notes/unarchive/${noteId}`);
    },
}



