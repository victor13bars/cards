import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCardsThunk, setCardPageCount} from "../redux/card-reducer";
import MyButton from "../components/UI/button/MyButton";
import {getCard} from "../components/utils/getCards";

const LearnPage = () => {
    const dispatch = useDispatch()
    const {packId} = useParams();
    const cards = useSelector(state => state.cards.cards)
    const [card, setCard] = useState(getCard(cards))
    const [answer, setAnswer] = useState(false)
    const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];
    const nextCard = () => {
        setCard(getCard(cards))
        setAnswer(false)
    }
    useEffect(() => {
        dispatch(setCardPageCount(1000))
        dispatch(getCardsThunk(packId))
    }, [packId])
    return (
        <div>
            {/*{cards.map(el => <h1>{el.question}</h1>)}*/}
            {/*<h1>LEARNNNNNNNNN</h1>*/}
            <div><h1>Qusetion:</h1>{card.question}</div>
            <MyButton onClick={() => setAnswer(true)}>Show Answer</MyButton>
            {answer && <div>
                <div><h1>Answer:</h1>{card.answer}</div>
                <div>{grades.map(el => <MyButton>{el}</MyButton>)}</div>
                <div><MyButton onClick={nextCard}>Next</MyButton></div>

            </div>}
        </div>
    );
};

export default LearnPage;