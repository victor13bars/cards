import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import SearchForm from "../components/SearchForm";
import TableForPacks from "../components/TableForPacks";
import {useDispatch, useSelector} from "react-redux";
import {createCardThunk, getCardsThunk} from "../redux/card-reducer";
import TableForCards from "../components/TableForCards";
import '../styles/App.css'
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";

const CardsList = () => {
    const dispatch = useDispatch();
    const {packId} = useParams();
    const [modal, setModal] = useState(false)
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("")
    const addNewCard = () => {
        dispatch(createCardThunk(answer, question, packId))
        setQuestion("")
        setAnswer("")
        setModal(false)
    }
    useEffect(() => {
        dispatch(getCardsThunk(packId))
    }, [packId])

    return (
        <div className='packList'>
            <div className='packListHeader'>
                <h2>Cards List</h2>
            </div>
            <div className='searchAndBtn'>
                <SearchForm/>
                <MyButton onClick={() => setModal(true)}>Add new card</MyButton>
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
            </div>
            <TableForCards/>
        </div>
    );
};

export default CardsList;