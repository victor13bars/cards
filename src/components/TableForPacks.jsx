import React, {useState} from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {deletePackThunk, editPackThunk, getPacksThunk, setTypeSort} from "../redux/pack-reducer";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/input/MyInput";
import {NavLink} from "react-router-dom";
import SortButton from "./SortButton";

const TableForPacks = () => {
    const columnNameTable = [
        {id: 1, columnName: 'Pack name'},
        {id: 2, columnName: 'Cards'},
        {id: 3, columnName: "Last updated"},
        {id: 4, columnName: "Created By"},
        {id: 5, columnName: "Actions"}
    ]
    const packs = useSelector(state => state.packs.cardPacks)
    const dispatch = useDispatch()
    const isMyPacks = useSelector(state => state.packs.isMyPacks)
    const userId = useSelector(state => state.auth._id)
    const sortPacks = useSelector(state => state.packs.sortPacks)
    const [delModal, setDelModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [inputEditModal, setInputEditModal] = useState("")
    const [saveId, setSaveId] = useState(0)

    const delOnClickBtn = (id) => {
        setDelModal(true)
        setSaveId(id)
    }
    const delPack = () => {
        if (isMyPacks) {
            dispatch(deletePackThunk(saveId, userId))
            setDelModal(false)
        } else {
            dispatch(deletePackThunk(saveId))
            setDelModal(false)
        }
    }
    const editOnClickBtn = (id, name) => {
        setEditModal(true)
        setInputEditModal(name)
        setSaveId(id)
    }
    const editPack = () => {
        if (isMyPacks) {
            dispatch(editPackThunk(saveId, inputEditModal, userId))
            setEditModal(false)
            setInputEditModal('')
        } else {
            dispatch(editPackThunk(saveId, inputEditModal))
            setEditModal(false)
            setInputEditModal('')
        }
    }
    const SortUp = () => {
        if (isMyPacks) {
            dispatch(setTypeSort("1updated"))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setTypeSort("1updated"))
            dispatch(getPacksThunk())
        }

    }
    const SortDown = () => {
        if (isMyPacks) {
            dispatch(setTypeSort("0updated"))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setTypeSort("0updated"))
            dispatch(getPacksThunk())
        }
    }
    const SortColumnCardsUp = () => {
        if (isMyPacks) {
            dispatch(setTypeSort("1cardsCount"))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setTypeSort("1cardsCount"))
            dispatch(getPacksThunk())
        }

    }
    const SortColumnCardsDown = () => {
        if (isMyPacks) {
            dispatch(setTypeSort("0cardsCount"))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setTypeSort("0cardsCount"))
            dispatch(getPacksThunk())
        }
    }
    return (
        <div>

            <MyModal visible={delModal} setVisible={setDelModal}>
                <h3>Delete Pack</h3>
                <p>Do you really want to remove Pack?<br/>
                    All cards will be excluded from this course
                </p>
                <div className='addNewPackModalBtn'>
                    <MyButton onClick={() => setDelModal(false)}>Cancel</MyButton>
                    <MyButton onClick={delPack}>Delete</MyButton>
                </div>
            </MyModal>

            <MyModal visible={editModal} setVisible={setEditModal}>
                <h3>Edit Pack</h3>
                <MyInput value={inputEditModal} placeholder='New pack name'
                         onChange={(e) => setInputEditModal(e.target.value)}/>
                <div className='addNewPackModalBtn'>
                    <MyButton onClick={() => setEditModal(false)}>Cancel</MyButton>
                    <MyButton onClick={editPack}>Save</MyButton>
                </div>
            </MyModal>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columnNameTable.map(function (el) {
                            if (el.columnName === "Last updated") {

                                return <th key={el.id}>
                                    {el.columnName}
                                    <SortButton
                                        typeSort={sortPacks}
                                        startValue="0updated"
                                        endValue="1updated"
                                        SortUp={SortUp}
                                        SortDown={SortDown}
                                    />
                                </th>
                            }
                        if (el.columnName === "Cards") {

                            return <th key={el.id}>
                                {el.columnName}
                                <SortButton
                                    typeSort={sortPacks}
                                    startValue="0cardsCount"
                                    endValue="1cardsCount"
                                    SortUp={SortColumnCardsUp}
                                    SortDown={SortColumnCardsDown}
                                />
                            </th>
                        }
                            return <th key={el.id}>{el.columnName}</th>
                        }
                    )}
                </tr>
                </thead>
                <tbody>
                {packs.map(el =>
                    <tr key={el._id}>
                        <td><NavLink to={`/cardsList/${el._id}`}>{el.name}</NavLink></td>
                        <td>{el.cardsCount}</td>
                        <td>{el.updated}</td>
                        <td>{el.user_name}</td>
                        <td>
                            {el.user_id === userId ?
                                <div className='table_actions_btn'>
                                    <MyButton onClick={() => delOnClickBtn(el._id)}>Delete</MyButton>
                                    <MyButton onClick={() => editOnClickBtn(el._id,el.name)}>Edit</MyButton>
                                    <MyButton>Learn</MyButton>
                                </div>
                                :
                                <div className='table_actions_btn'>
                                    <MyButton>Learn</MyButton>
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

export default TableForPacks;