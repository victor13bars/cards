import {authAPI} from "../api/api";

const SET_LOGIN_INFO = 'SET_LOGIN_INFO'
const SET_AUTH = 'SET_AUTH'
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'
const SET_IS_ERROR = 'SET_IS_ERROR'
const SET_IS_CRUSER = 'SET_IS_CRUSER'

let initialState = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: false,
    error: null,
    isError: false,
    isAuth: false,
    isLoading: false,
    isCreatedUser: false
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
        case SET_IS_ERROR:
            return {
                ...state,
                isError: action.payload
            }
        case SET_IS_CRUSER:
            return {
                ...state,
                isCreatedUser: action.payload
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
export const setIsError = (bool) => ({type: SET_IS_ERROR, payload: bool})
export const setIsCreatedUser = (isCreate) => ({type: SET_IS_CRUSER, payload: isCreate})

export const loginThunk = (email, password, rememberMe) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let loginData = await authAPI.login(email, password, rememberMe);
        dispatch(setLoginInfo(loginData))
        dispatch(setAuth(true))
    } catch (e) {
        dispatch(setError(e.response.data.error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }

}

export const logoutThunk = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let logoutData = await authAPI.logout()
        dispatch(setAuth(false))
    } catch (e) {
        dispatch(setError(e.response.data.error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }

}

export const registerThunk = (email, password) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let registerData = await authAPI.register(email, password)
        console.log(registerData)
        dispatch(setIsCreatedUser(true))
    } catch (e) {
        console.log(e)
        dispatch(setError(e.response.data.error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const authMeThunk = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let authMeData = await authAPI.authMe();
        dispatch(setLoginInfo(authMeData))
        dispatch(setAuth(true))
    } catch (e) {
        dispatch(setError(e.response.data.error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const editAuthMeThunk = (name,avatar) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editAuthMeData = await authAPI.editAuthMe(name,avatar);
        console.log('editAuthMeData',editAuthMeData)
        dispatch(setLoginInfo(editAuthMeData))

    } catch (e) {
        dispatch(setError(e.response.data.error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}