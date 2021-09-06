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
            .then(res => console.log(res.data))
    }
}