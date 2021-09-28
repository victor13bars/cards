import {authAPI, cardAPI, packsAPI} from "../api/api";
import {setAuth, setError, setIsError, setLoading, setLoginInfo} from "./auth-reducer";

const SET_CARDS = "SET_CARDS"
// const SET_SEARCH_VALUE = "SET_SEARCH_VALUE"
// const SET_TYPE_SORT = "SET_TYPE_SORT"
// const SET_IS_MYPACKS = "SET_IS_MYPACKS"
// const SET_PAGE = "SET_PAGE"
// const SET_PAGE_COUNT = "SET_PAGE_COUNT"

let initialState = {
    cards: [
        {
            answer: null,
            question: null,
            cardsPack_id: null,
            grade: null,
            rating: null,
            shots: null,
            type: null,
            user_id: null,
            created: null,
            updated: null,
            _v: null,
            _id: null
        }
    ],
    cardsTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: 1,
    pageCount: 4,
    packUserId: null
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARDS :
            return {
                ...state,
                ...action.payload,
                cards: action.payload.cards
            }

        default:
            return state;
    }
}

export const setCards = (cards) => ({type: SET_CARDS, payload: cards})


export const getCardsThunk = (cardsPackId) => async (dispatch) => {
    // const {searchValue, sortPacks, page, pageCount} = getState().packs

    try {
        dispatch(setLoading(true))
        let cardsData = await cardAPI.getCards(cardsPackId)
        dispatch(setCards(cardsData))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}
export const createCardThunk = (answer, question, cardsPack_id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let newCard = await cardAPI.createCard({answer: answer, question: question, cardsPack_id: cardsPack_id})
        dispatch(getCardsThunk(cardsPack_id))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const deleteCardThunk = (cardId, packId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let deleteCard = await cardAPI.deleteCard(cardId)
        dispatch(getCardsThunk(packId))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}

export const editCardThunk = (packId,id,question,answer) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editCards = await cardAPI.editCard({_id: id, question: question,answer:answer})
        dispatch(getCardsThunk(packId))
    } catch (e) {
        console.log(e.response)
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}