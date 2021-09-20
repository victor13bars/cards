import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import {useDispatch, useSelector} from "react-redux";
import {createPackThunk, getPacksThunk} from "../redux/pack-reducer";
import MyInput from "../components/UI/input/MyInput";
import Table from "../components/TableData";
import TableData from "../components/TableData";
import SearchForm from "../components/SearchForm";
import MyModal from "../components/UI/MyModal/MyModal";

const PacksList = () => {
    const columnNameTable = [
        {id: 1, columnName: 'Pack name'},
        {id: 2, columnName: 'Cards'},
        {id: 3, columnName: "Last updated"},
        {id: 4, columnName: "Created By"},
        {id: 5, columnName: "Actions"}
    ]
    const packs = useSelector(state => state.packs.cardPacks)
    console.log(packs)

    const dispatch = useDispatch()
    const [inputModal, setInputModal] = useState('')
    console.log(inputModal)
    const [modal, setModal] = useState(false)

    const getSearchPacks = (searchValue) => {
        dispatch(getPacksThunk(searchValue))
    }
    const addNewPackOpenModal = () => {
        setModal(true)
    }
    const addNewPack = () => {
        dispatch(createPackThunk(inputModal))
        setModal(false)
        setInputModal('')
        // dispatch(getPacksThunk())
    }

    useEffect(() => {
        dispatch(getPacksThunk())
    }, [])

    return (
        <div className='packList'>
            <div className='packListHeader'>
                <h2>Packs List</h2>
                <MyButton>My</MyButton>
                <MyButton>All</MyButton>
            </div>
            <div className='searchAndBtn'>
                <SearchForm getSearchData={getSearchPacks}/>
                <MyButton onClick={addNewPackOpenModal}>Add new pack</MyButton>
                <MyModal visible={modal} setVisible={setModal}>
                    <h3>Add new pack</h3>
                    <MyInput value={inputModal} placeholder='Name pack'
                             onChange={(e) => setInputModal(e.target.value)}/>
                    <div className='addNewPackModalBtn'>
                        <MyButton onClick={() => setModal(false)}>Cancel</MyButton>
                        <MyButton onClick={addNewPack}>Save</MyButton>
                    </div>
                </MyModal>
            </div>
            <TableData columnName={columnNameTable} dataArray={packs}/>
        </div>
    );
};

export default PacksList;