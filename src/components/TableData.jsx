import React, {useState} from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"
import {useDispatch, useSelector} from "react-redux";
import {createPackThunk, deletePackThunk, editPackThunk, getPacksThunk, setTypeSort} from "../redux/pack-reducer";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/input/MyInput";
import {getPageCount, getPagesArray} from "./utils/pages";
import Paginator from "./UI/Paginator/Paginator";

const TableData = ({dataArray, columnName}) => {
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
        dispatch(deletePackThunk(saveId))
        setDelModal(false)
    }
    const editOnClickBtn = (id) => {
        setEditModal(true)
        setSaveId(id)
    }
    const editPack = () => {
        dispatch(editPackThunk(saveId, inputEditModal))
        setEditModal(false)
        setInputEditModal('')
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
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columnName.map(function (el) {
                            if (el.columnName === "Last updated") {

                                return <th key={el.id}>
                                    {el.columnName}
                                    <MyButton
                                        className={sortPacks === "0updated" ? "table_sort_btn_passive" : "table_sort_btn_active"}
                                        onClick={SortUp}
                                    >Up</MyButton>
                                    <MyButton
                                        className={sortPacks === "1updated" ? "table_sort_btn_passive" : "table_sort_btn_active"}
                                        onClick={SortDown}
                                    >Down</MyButton>
                                </th>
                            }
                            return <th key={el.id}>{el.columnName}</th>
                        }
                    )}
                </tr>
                </thead>
                <tbody>
                {dataArray.map(el =>
                    <tr key={el._id}>
                        <td>{el.name}</td>
                        <td>{el.cardsCount}</td>
                        <td>{el.updated}</td>
                        <td>{el.user_name}</td>
                        <td>
                            {el.user_id === userId ?
                                <div className='table_actions_btn'>

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

                                    <MyModal visible={editModal} setVisible={setEditModal} id={el._id}
                                             callback={editPack}>
                                        <h3>Edit Pack</h3>
                                        <MyInput value={inputEditModal} placeholder='New pack name'
                                                 onChange={(e) => setInputEditModal(e.target.value)}/>
                                        <div className='addNewPackModalBtn'>
                                            <MyButton onClick={() => setEditModal(false)}>Cancel</MyButton>
                                            <MyButton onClick={editPack}>Save</MyButton>
                                        </div>
                                    </MyModal>
                                    <MyButton onClick={() => delOnClickBtn(el._id)}>Delete</MyButton>
                                    <MyButton onClick={() => editOnClickBtn(el._id)}>Edit</MyButton>
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
            <Paginator/>
        </div>
    );
};

export default TableData;