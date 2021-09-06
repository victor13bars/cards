import {authAPI} from "../api/api";

const SET_LOGIN_INFO = 'SET_LOGIN_INFO'
const SET_AUTH = 'SET_AUTH'
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'

let initialState = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: false,
    error: null,
    isAuth: false,
    isLoading: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_INFO:
            return {
                ...state,
                ...action.payload
            }
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const setLoginInfo = (data) => ({
    type: SET_LOGIN_INFO,
    payload: data
})
export const setAuth = (isAuth) => ({type: SET_AUTH, payload: isAuth})
export const setLoading = (load) => ({type: SET_LOADING, payload: load})
export const setError = (error) => ({type: SET_ERROR, payload: error})

export const loginThunk = (email, password, rememberMe) => async (dispatch) => {
    try {
        setLoading(true)
        let loginData = await authAPI.login(email, password, rememberMe);
        setLoginInfo(loginData)
        setAuth(true)
        console.log(loginData,"try")
    } catch (e) {
        console.log(e,"error")
        setError()
    } finally {
        setLoading(false)
    }

}