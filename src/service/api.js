import axios from 'axios'
import AuthenticationService from '../service/AuthenticationService.js'

const API_URL = 'http://' + process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_API_PORT
const api =  axios.create({baseURL:API_URL, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
}})

AuthenticationService.setupAxiosInterceptorsForJWTAuth(api)

export default api;