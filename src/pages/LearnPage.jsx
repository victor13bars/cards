import React, {useEffect, useState} from 'react';
import "../styles/App.css"
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editGradeThunk, getCardsThunk, setCardPageCount} from "../redux/card-reducer";
import MyButton from "../components/UI/button/MyButton";
import {getCard} from "../components/utils/getCard";
import Loader from "../components/UI/Loader/Loader";

const LearnPage = () => {
    const dispatch = useDispatch()
    const {packId} = useParams();
    const cards = useSelector(state => state.cards.cards)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isError = useSelector(state => state.auth.isError)
    console.log("cards",cards)
    const [card, setCard] = useState({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    })
    console.log("card",card)
  const cardsTotalCount = useSelector(state => state.cards.cardsTotalCount)
    console.log("cardsTotalCount",cardsTotalCount)
    const [answer, setAnswer] = useState(false)
    const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];
    const nextCard = () => {
        setCard(getCard(cards))
        setAnswer(false)
    }
    const grade = (grade) => {
        dispatch(editGradeThunk(grade, card._id))
        setAnswer(false)
        console.log(grade)
    }
    useEffect(() => {
        dispatch(setCardPageCount(1000))
        dispatch(getCardsThunk(packId))
        return ()=>{
            dispatch(setCardPageCount(4))
        }

    }, [])
    useEffect(()=>{
        setCard(getCard(cards));
    },[])

    if (isLoading) {
        return <Loader/>
    }
    if (isError) {
        return <Redirect to='/error'/>
    }

    return (
        <div className='learn_Page'>
            <div className='packListHeader'>
                <h2>Learn Page</h2>
            </div>
            {cards.length <=0  ?
                <div>
                    <h2 style={{color:'red'}}>There are no cards in this pack</h2>
                </div>
                :
                <div className='questionContainer'>
                    <h2 style={{color:'darkred'}}>Question: {card.question}</h2>
                    <div className="doubleBtn">
                        <MyButton onClick={() => setAnswer(true)}>Show Answer</MyButton>
                        <MyButton onClick={nextCard}>Next Question</MyButton>
                    </div>
                </div>
            }

            {answer && <div className='questionContainer'>
                <h2>Answer: {card.answer}</h2>
                <h2 style={{color:'darkred'}}>Rate yourself: </h2>
                <div className='rateBtns'>
                    {grades.map((el, i) => <div key={i} className="rateBtn">
                        <MyButton onClick={() => grade(i + 1)}>{el}</MyButton>
                    </div>)}
                </div>
            </div>}
        </div>
    );
};

export default LearnPage;