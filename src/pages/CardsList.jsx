import React, {useEffect, useState} from 'react';
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

const CardsList = () => {
    let pagesArray = []
    const dispatch = useDispatch();
    const {packId} = useParams();
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
    const setCurPageCount = (value) => {
        dispatch(setCardPage(1))
        dispatch(setCardPageCount(value))
        dispatch(getCardsThunk(packId))
    }

    const setCurPage = (page) => {
        dispatch(setCardPage(page))
        dispatch(getCardsThunk(packId))
    }

    useEffect(() => {
        dispatch(getCardsThunk(packId))
    }, [packId])

    return (
        <div className='packList'>
            <MyModal visible={modal} setVisible={setModal}>
                <h3>Add new card</h3>
                <MyInput value={question} placeholder='Question'
                         onChange={(e) => setQuestion(e.target.value)}/>
                <MyInput value={answer} placeholder='Answer'
                         onChange={(e) => setAnswer(e.target.value)}/>
                <div className='addNewPackModalBtn'>
                    <MyButton onClick={() => setModal(false)}>Cancel</MyButton>
                    <MyButton onClick={addNewCard}>Save</MyButton>
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
                pagesArray={pagesArray}
                page={page}
                cardPacksTotalCount={cardsTotalCount}
                pageCount={pageCount}
                onChangeCurPage={setCurPage}
                onChangeCurPageCount={setCurPageCount}
            />
        </div>
    );
};

export default CardsList;