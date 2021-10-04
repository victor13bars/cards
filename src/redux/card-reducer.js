import {authAPI, cardAPI, gradeAPI, packsAPI} from "../api/api";
import {setAuth, setError, setIsError, setLoading, setLoginInfo} from "./auth-reducer";

const SET_CARDS = "SET_CARDS"
const SET_SEARCH_QUESTION = "SET_SEARCH_QUESTION"
const SET_CARDS_TYPE_SORT = "SET_CARDS_TYPE_SORT"
const SET_CARD_PAGE = "SET_CARD_PAGE"
const SET_CARD_PAGE_COUNT = "SET_CARD_PAGE_COUNT"
const SET_EDIT_GRADE = "SET_EDIT_GRADE"

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
    packUserId: null,
    questionSearch: "",
    typeSort: "0grade"
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARDS :
            return {
                ...state,
                ...action.payload,
                cards: action.payload.cards
            }
        case SET_SEARCH_QUESTION:
            return {
                ...state,
                questionSearch: action.payload
            }
        case SET_CARD_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_CARD_PAGE_COUNT:
            return {
                ...state,
                pageCount: action.payload
            }
        case SET_CARDS_TYPE_SORT:
            return {
                ...state,
                typeSort: action.payload
            }
        case SET_EDIT_GRADE:
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload.card_id ? {
                    ...card,
                    grade: action.payload.grade
                } : card)
            }

        default:
            return state;
    }
}

export const setCards = (cards) => ({type: SET_CARDS, payload: cards})
export const setSearchQuestion = (value) => ({type: SET_SEARCH_QUESTION, payload: value})
export const setCardPage = (page) => ({type: SET_CARD_PAGE, payload: page})
export const setCardPageCount = (count) => ({type: SET_CARD_PAGE_COUNT, payload: count})
export const setCardTypeSort = (sort) => ({type: SET_CARDS_TYPE_SORT, payload: sort})
export const setEditGrade = (editGrade) => ({type: SET_EDIT_GRADE, payload: editGrade})

export const getCardsThunk = (cardsPackId) => async (dispatch, getState) => {
    const {questionSearch, page, pageCount, typeSort} = getState().cards
    try {
        dispatch(setLoading(true))
        let cardsData = await cardAPI.getCards(questionSearch, cardsPackId, typeSort, page, pageCount)
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

export const editCardThunk = (packId, id, question, answer) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editCards = await cardAPI.editCard({_id: id, question: question, answer: answer})
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

export const editGradeThunk = (grade, card_id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        let editGrade = await gradeAPI.editGrade(grade, card_id)
        console.log("editGrade",editGrade)
        dispatch(setEditGrade(editGrade))
    } catch (e) {
        let error = e.response ? e.response.data.error : "Server Error"
        dispatch(setError(error))
        dispatch(setIsError(true))
    } finally {
        dispatch(setLoading(false))
    }
}