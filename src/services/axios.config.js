
import axios from 'axios';
//require("dotenv").config();
//console.log(process.env.BASE_URL)

axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');