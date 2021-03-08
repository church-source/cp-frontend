import axios from 'axios'
import AuthenticationService from '../service/AuthenticationService.js'

const API_URL = 'http://' + window._env_.REACT_APP_API_URL + ':' + window._env_.REACT_APP_API_PORT + '/api'
const api =  axios.create({baseURL:API_URL, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
}})

AuthenticationService.setupAxiosInterceptorsForJWTAuth(api)

export default api;