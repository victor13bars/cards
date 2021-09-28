import axios from "axios";
import {logoutThunk} from "../redux/auth-reducer";

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
export const packsAPI = {
    getCardsPack(packName, sortPacks, page, pageCount, user_id) {
        return instance.get(`cards/pack`, {
            params: {
                packName,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        })
            .then(res => res.data)
    },
    createCardsPack(addPackPayload) {
        return instance.post(`cards/pack`, {
            cardsPack: addPackPayload
        })

            .then(res => res.data)
    },
    deleteCardsPack(packId) {
        return instance.delete(`cards/pack?id=${packId}`)
            .then(res => res.data)
    },
    editCardsPack(editPackPayload) {
        return instance.put(`cards/pack`, {
            cardsPack: editPackPayload
        })
            .then(res => res.data)
    }

}

export const cardAPI = {
    getCards(cardsPack_id) {
        return instance.get(`cards/card`, {
            params: {
                cardsPack_id
            }
        })
            .then(res => res.data)
    }
}