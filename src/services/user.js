import axios from "axios";

export default {
    registerUser(userDetail) {

        return axios.post("http://localhost:3000/register", userDetail);
    }
}



