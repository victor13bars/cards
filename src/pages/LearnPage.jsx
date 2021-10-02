import React, {useEffect, useState} from 'react';
import "../styles/App.css"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCardsThunk, setCardPageCount} from "../redux/card-reducer";
import MyButton from "../components/UI/button/MyButton";
import {getCard} from "../components/utils/getCard";

const LearnPage = () => {
    const dispatch = useDispatch()
    const {packId} = useParams();
    const cards = useSelector(state => state.cards.cards)
    const [card, setCard] = useState(getCard(cards))
    const [answer, setAnswer] = useState(false)
    const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];
    const nextCard = () => {
        setCard(getCard(cards))
        setAnswer(false)
    }
    const grade = (grade) => {
        console.log(grade)
    }
    useEffect(() => {
        dispatch(setCardPageCount(1000))
        dispatch(getCardsThunk(packId))
    }, [packId])
    return (
        <div className='learn_Page'>
            <div className='packListHeader'>
                <h2>Learn Page</h2>
            </div>
            <div className='questionContainer'>
                <h2>Question: {card.question}</h2>
                <div className="doubleBtn">
                    <MyButton onClick={() => setAnswer(true)}>Show Answer</MyButton>
                    <MyButton onClick={nextCard}>Next Question</MyButton>
                </div>
            </div>

            {answer && <div className='questionContainer'>
                <h2>Answer: {card.answer}</h2>
                <h2>Rate yourself: </h2>
                <div className='rateBtns'>
                    {grades.map((el, i) => <div className="rateBtn">
                        <MyButton onClick={() => grade(i + 1)}>{el}</MyButton>
                    </div>)}
                </div>
            </div>}
        </div>
    );
};

export default LearnPage;