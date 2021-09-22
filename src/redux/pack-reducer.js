import {authAPI, packsAPI} from "../api/api";
import {setAuth, setError, setIsError, setLoading, setLoginInfo} from "./auth-reducer";

const SET_PACKS = "SET_PACKS"
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"
const SET_TYPE_SORT = "SET_TYPE_SORT"
const SET_IS_MYPACKS = "SET_IS_MYPACKS"

let initialState = {
    cardPacks: [
        {
            _id: null,
            name: null,
            cardsCount: null,
            created: null,
            updated: null
        }
    ],
    cardPacksTotalCount: null,
    maxCardsCount: null,
    minCardsCount: null,
    pageCount: null,
    searchValue: '',
    sortPacks: '0updated',
    isMyPacks: false
}

export const packReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PACKS :
            return {
                ...state,
                ...action.payload,
                cardPacks: action.payload.cardPacks
            }
        case SET_SEARCH_VALUE :
            return {
                ...state,
                searchValue: action.payload
            }
        case SET_TYPE_SORT:
            return {
                ...state,
                sortPacks: action.payload
            }
        case SET_IS_MYPACKS:
            return {
                ...state,
                isMyPacks: action.payload
            }
        default:
            return state;
    }
}

export const setPacks = (packs) => ({type: SET_PACKS, payload: packs})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, payload: value})
export const setTypeSort = (typeSort) => ({type: SET_TYPE_SORT, payload: typeSort})
export const setIsMyPacks = (bool) => ({type: SET_IS_MYPACKS, payload: bool})

export const getPacksThunk = (userId = '') => async (dispatch, getState) => {
    const {searchValue, sortPacks} = getState().packs
    console.log('EEEEEEEEEEEEEEE', getState().packs)
    try {
        dispatch(setLoading(true))
        let packsData = await packsAPI.getCardsPack(searchValue, sortPacks, userId)
        dispatch(setPacks(packsData))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}
export const createPackThunk = (packName) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let newCardsPack = await packsAPI.createCardsPack({name: packName})
        console.log(newCardsPack)
        dispatch(getPacksThunk())
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deletePackThunk = (packId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let deletePack = await packsAPI.deleteCardsPack(packId)
        console.log(deletePack)
        dispatch(getPacksThunk())
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const editPackThunk = (packId, newPackName) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editCardsPack = await packsAPI.editCardsPack({_id: packId, name: newPackName})
        console.log(editCardsPack)
        dispatch(getPacksThunk())
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}