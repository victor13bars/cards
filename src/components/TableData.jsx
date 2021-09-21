import React, {useState} from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"
import {useDispatch, useSelector} from "react-redux";
import {deletePackThunk, getPacksThunk, setTypeSort} from "../redux/pack-reducer";
import MyModal from "./UI/MyModal/MyModal";

const TableData = ({dataArray, columnName}) => {
    const dispatch = useDispatch()
    const isMyPacks = useSelector(state => state.packs.isMyPacks)
    const userId = useSelector(state => state.auth._id)
    const sortPacks = useSelector(state => state.packs.sortPacks)
    const [delModal, setDelModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const delPack = (id) => {
        dispatch(deletePackThunk(id))
        setDelModal(false)
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

            <MyModal>

            </MyModal>
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
                                            <MyButton onClick={() => delPack(el._id)}>Delete</MyButton>
                                        </div>
                                    </MyModal>
                                    <MyButton onClick={() => setDelModal(true)}>Delete</MyButton>
                                    <MyButton>Edit</MyButton>
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

export default TableData;