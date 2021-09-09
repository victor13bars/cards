import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

export const authAPI = {
    login(email = 'nya-admin@nya.nya', password = '1qazxcvBG', rememberMe) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/me`, {})
            .then(res => res.data)
    },
    register(email = 'nya-admin@nya.nya', password = '1qazxcvBG') {
        return instance.post(`auth/register`, {
            email,
            password
        })
            .then(res => res.data)
    }
}