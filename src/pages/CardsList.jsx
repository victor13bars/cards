import React, {useCallback, useEffect, useState} from 'react';
import "../styles/App.css"
import {useParams} from 'react-router-dom'
import SearchForm from "../components/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {createCardThunk, getCardsThunk, setCardPage, setCardPageCount, setSearchQuestion} from "../redux/card-reducer";
import TableForCards from "../components/TableForCards";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";
import Paginator from "../components/UI/Paginator/Paginator";
import {getPacksThunk, setPage, setPageCount} from "../redux/pack-reducer";
import Loader from "../components/UI/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage";

const CardsList = () => {
    console.log("CardsList")
    const dispatch = useDispatch();
    const {packId} = useParams();
    const cardsArray = useSelector(state => state.cards.cards)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isError = useSelector(state => state.auth.isError)
    const page = useSelector(state => state.cards.page)
    const pageCount = useSelector(state => state.cards.pageCount)
    const cardsTotalCount = useSelector(state => state.cards.cardsTotalCount)
    const [modal, setModal] = useState(false)
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("")
    const addNewCard = () => {
        dispatch(createCardThunk(answer, question, packId))
        setQuestion("")
        setAnswer("")
        setModal(false)
    }
    const searchCard = (question) => {
        dispatch(setSearchQuestion(question))
        dispatch(getCardsThunk(packId))
    }
    const setCurPageCount = useCallback((value) => {
        dispatch(setCardPage(1))
        dispatch(setCardPageCount(value))
        dispatch(getCardsThunk(packId))
    }, [page])

    const setCurPage = useCallback((page) => {
        dispatch(setCardPage(page))
        dispatch(getCardsThunk(packId))
    }, [page])

    useEffect(() => {
        dispatch(setCardPage(1))
        dispatch(getCardsThunk(packId))
    }, [packId])

    if (isLoading) {
        return <Loader/>
    }
    if (isError) {
        return <ErrorMessage/>
    }

    return (
        <>
            {cardsArray.length >= 1
                ?

                <div className='packList'>
                    <MyModal visible={modal} setVisible={setModal}>
                        <p>Add new card</p>
                        <MyInput value={question} placeholder='Question'
                                 onChange={(e) => setQuestion(e.target.value)}/>
                        <MyInput value={answer} placeholder='Answer'
                                 onChange={(e) => setAnswer(e.target.value)}/>
                        <div className='addNewPackModalBtn'>
                            <MyButton className='addNewPackModalButton' onClick={() => setModal(false)}>Cancel</MyButton>
                            <MyButton className='addNewPackModalButton' onClick={addNewCard}>Save</MyButton>
                        </div>
                    </MyModal>
                    <div className='packListHeader'>
                        <h2>Cards List</h2>
                    </div>
                    <div className='searchAndBtn'>
                        <SearchForm searchCallBack={searchCard} placeholder="search for questions"/>
                        <MyButton onClick={() => setModal(true)}>Add new card</MyButton>
                    </div>
                    <TableForCards packId={packId}/>
                    <Paginator
                        page={page}
                        cardPacksTotalCount={cardsTotalCount}
                        pageCount={pageCount}
                        onChangeCurPage={setCurPage}
                        onChangeCurPageCount={setCurPageCount}
                    />
                    }

                </div>
                :
                <div><h2 style={{marginTop: "20px", color: "red"}}>There are no cards in this pack!</h2></div>
            }
        </>
    );
};

export default CardsList;