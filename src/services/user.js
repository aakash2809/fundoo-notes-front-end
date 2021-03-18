import axios from 'axios';

export default {
	registerUser(userDetail) {
		return axios.post('/register', userDetail);
	},

	loginUser(loginCredentials) {
		return axios.post('/login', loginCredentials);
	},

	forgotPassword(emailId) {
		return axios.post('/forgotPassword', emailId);
	},

	async resetPassword(detailForResetPassword) {
		return await axios.put('/resetPassword', detailForResetPassword);
	}
};



