import {authAPI, packsAPI} from "../api/api";
import {setAuth, setError, setIsError, setLoading, setLoginInfo} from "./auth-reducer";

const SET_PACKS = "SET_PACKS"

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
    pageCount: null
}

export const packReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PACKS :
            return {
                ...state,
                ...action.payload,
                cardPacks: action.payload.cardPacks
            }
        default:
            return state;
    }
}

export const setPacks = (packs) => ({type: SET_PACKS, payload: packs})

export const getPacksThunk = (searchValue, sortPacks) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let packsData = await packsAPI.getCardsPack(searchValue, sortPacks)
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
