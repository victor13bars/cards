import {authAPI, packsAPI} from "../api/api";
import {setAuth, setError, setIsError, setLoading, setLoginInfo} from "./auth-reducer";

const SET_PACKS = "SET_PACKS"
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"
const SET_TYPE_SORT = "SET_TYPE_SORT"
const SET_IS_MYPACKS = "SET_IS_MYPACKS"
const SET_PAGE = "SET_PAGE"
const SET_PAGE_COUNT = "SET_PAGE_COUNT"

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
    cardPacksTotalCount: 0,
    maxCardsCount: null,
    minCardsCount: null,
    page: 1,
    pageCount: 4,
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
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_PAGE_COUNT:
            return {
                ...state,
                pageCount: action.payload
            }
        default:
            return state;
    }
}

export const setPacks = (packs) => ({type: SET_PACKS, payload: packs})
export const setSearchValue = (value) => ({type: SET_SEARCH_VALUE, payload: value})
export const setTypeSort = (typeSort) => ({type: SET_TYPE_SORT, payload: typeSort})
export const setIsMyPacks = (bool) => ({type: SET_IS_MYPACKS, payload: bool})
export const setPage = (number) => ({type: SET_PAGE, payload: number})
export const setPageCount = (number) => ({type: SET_PAGE_COUNT, payload: number})

export const getPacksThunk = (userId = '') => async (dispatch, getState) => {
    const {searchValue, sortPacks, page, pageCount} = getState().packs
    console.log('EEEEEEEEEEEEEEE', getState().packs)
    try {
        dispatch(setLoading(true))
        let packsData = await packsAPI.getCardsPack(searchValue, sortPacks, page, pageCount, userId)
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
export const createPackThunk = (packName, userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let newCardsPack = await packsAPI.createCardsPack({name: packName})
        console.log(newCardsPack)
        dispatch(getPacksThunk(userId))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deletePackThunk = (packId, userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let deletePack = await packsAPI.deleteCardsPack(packId)
        console.log(deletePack)
        dispatch(getPacksThunk(userId))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const editPackThunk = (packId, newPackName, userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editCardsPack = await packsAPI.editCardsPack({_id: packId, name: newPackName})
        console.log(editCardsPack)
        dispatch(getPacksThunk(userId))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}