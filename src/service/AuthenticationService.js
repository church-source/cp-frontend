//import api from './api'
import axios from 'axios'

const API_URL = 'https://' + window._env_.REACT_APP_API_URL + ':' + window._env_.REACT_APP_API_PORT + '/api/churchauth'
const api =  axios.create({baseURL:API_URL, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
}})

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_ACCESS_TOKEN_ATTRIBUTE_NAME = 'accessToken'
export const USER_ACCESS_PERMISSIONS = 'accessPermissions'
class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return api.get(`basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    executeJwtAuthenticationService(username, password) {
        return api.post(`authenticate`, {
            username,
            password
        })
    }

    executeChangePasswordWithChangePasswordToken(username, oldPassword, newPassword, changePasswordToken) {
        let config = {
            headers: {
              'Authorization': this.createJWTToken(changePasswordToken)
            }
        }    
        return api.patch(`user/changePassword`, {
            username,
            oldPassword,
            newPassword
        }, config)
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptorsForBasicAuth(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token, permissions) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_ACCESS_TOKEN_ATTRIBUTE_NAME, token)
        sessionStorage.setItem(USER_ACCESS_PERMISSIONS, JSON.stringify(permissions))
        this.setupAxiosInterceptorsForJWTAuth(api)
    }

    userHasPermission(permission) {
        if(sessionStorage.getItem(USER_ACCESS_PERMISSIONS) == null) 
            return false;
        return sessionStorage.getItem(USER_ACCESS_PERMISSIONS).includes(permission)
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_ACCESS_TOKEN_ATTRIBUTE_NAME)

    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptorsForJWTAuth(api) {
        api.interceptors.request.use(
           function(config) {
                let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
                let token = sessionStorage.getItem(USER_ACCESS_TOKEN_ATTRIBUTE_NAME)
                if (user !== null) {
                    config.headers.authorization = 'Bearer ' + token
                }
                return config
            }
        )
    }

    setupAxiosInterceptorsForBasicAuth(token) {
        api.interceptors.request.use(
           function(config) {
                let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
                if (user !== null) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()