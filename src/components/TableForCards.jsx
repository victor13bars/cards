import React, {useState} from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import MyModal from "./UI/MyModal/MyModal";
import {deleteCardThunk, editCardThunk, getCardsThunk, setCardTypeSort} from "../redux/card-reducer";
import MyInput from "./UI/input/MyInput";
import SortButton from "./SortButton";

const TableForCards = ({packId}) => {
    const columnNameTable = [
        {id: 1, columnName: 'Question'},
        {id: 2, columnName: 'Answer'},
        {id: 3, columnName: "Last updated"},
        {id: 4, columnName: "Grade"},
        {id: 5, columnName: "Actions"}
    ]
    const cardsArray = useSelector(state => state.cards.cards)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth._id)
    const typeSort = useSelector(state => state.cards.typeSort)
    const [delModal, setDelModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [saveId, setSaveId] = useState(0)

    const delOnClickBtn = (id) => {
        setDelModal(true)
        setSaveId(id)
    }
    const delPack = () => {
        dispatch(deleteCardThunk(saveId, packId))
        setDelModal(false)
    }
    const editOnClickBtn = (id, questionValue, answerValue) => {
        setEditModal(true)
        setQuestion(questionValue)
        setAnswer(answerValue)
        setSaveId(id)
    }
    const editPack = () => {
        dispatch(editCardThunk(packId, saveId, question, answer))
        setEditModal(false)
        setAnswer('')
        setQuestion("")
    }
    const SortUp = () => {
            dispatch(setCardTypeSort("1grade"))
            dispatch(getCardsThunk(packId))
    }
    const SortDown = () => {
        dispatch(setCardTypeSort("0grade"))
        dispatch(getCardsThunk(packId))
    }
    const SortUpdatedUp = () => {
        dispatch(setCardTypeSort("1updated"))
        dispatch(getCardsThunk(packId))
    }
    const SortUpdatedDown = () => {
        dispatch(setCardTypeSort("0updated"))
        dispatch(getCardsThunk(packId))
    }
    return (
        <div>
            <MyModal visible={delModal} setVisible={setDelModal}>
                <h3>Delete Pack</h3>
                <p>Do you really want to remove Pack?</p>
                <div className='addNewPackModalBtn'>
                    <MyButton onClick={() => setDelModal(false)}>Cancel</MyButton>
                    <MyButton onClick={delPack}>Delete</MyButton>
                </div>
            </MyModal>

            <MyModal visible={editModal} setVisible={setEditModal}>
                <h3>Edit card</h3>
                <MyInput value={question} placeholder='Question'
                         onChange={(e) => setQuestion(e.target.value)}/>
                <MyInput value={answer} placeholder='Answer'
                         onChange={(e) => setAnswer(e.target.value)}/>
                <div className='addNewPackModalBtn'>
                    <MyButton onClick={() => setEditModal(false)}>Cancel</MyButton>
                    <MyButton onClick={editPack}>Save</MyButton>
                </div>
            </MyModal>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columnNameTable.map(function (el) {
                            if (el.columnName === "Grade") {

                                return <th key={el.id}>
                                    {el.columnName}
                                    <SortButton
                                        typeSort={typeSort}
                                        startValue="0grade"
                                        endValue="1grade"
                                        SortUp={SortUp}
                                        SortDown={SortDown}
                                    />
                                </th>
                            }
                        if (el.columnName === "Last updated") {

                            return <th key={el.id}>
                                {el.columnName}
                                <SortButton
                                    typeSort={typeSort}
                                    startValue="0updated"
                                    endValue="1updated"
                                    SortUp={SortUpdatedUp}
                                    SortDown={SortUpdatedDown}
                                />
                            </th>
                        }
                            return <th key={el.id}>{el.columnName}</th>
                        }
                    )}
                </tr>
                </thead>
                <tbody>
                {cardsArray.map(el =>
                    <tr key={el._id}>
                        <td>{el.question}</td>
                        <td>{el.answer}</td>
                        <td>{el.updated}</td>
                        <td>{el.grade}</td>
                        <td>
                            {el.user_id === userId ?
                                <div className='table_actions_btn'>
                                    <MyButton onClick={() => delOnClickBtn(el._id)}>Delete</MyButton>
                                    <MyButton
                                        onClick={() => editOnClickBtn(el._id, el.question, el.answer)}>Edit</MyButton>
                                </div>
                                :
                                <div className='table_actions_btn'>
                                    <p>No actions because this is not your pack</p>
                                </div>
                            }
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default TableForCards;