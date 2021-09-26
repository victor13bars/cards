import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import {useDispatch, useSelector} from "react-redux";
import {createPackThunk, getPacksThunk, setIsMyPacks, setPage, setPageCount} from "../redux/pack-reducer";
import MyInput from "../components/UI/input/MyInput";
import Table from "../components/TableData";
import TableData from "../components/TableData";
import SearchForm from "../components/SearchForm";
import MyModal from "../components/UI/MyModal/MyModal";
import Paginator from "../components/UI/Paginator/Paginator";

const PacksList = () => {
    const columnNameTable = [
        {id: 1, columnName: 'Pack name'},
        {id: 2, columnName: 'Cards'},
        {id: 3, columnName: "Last updated"},
        {id: 4, columnName: "Created By"},
        {id: 5, columnName: "Actions"}
    ]
    const packs = useSelector(state => state.packs.cardPacks)
    const userId = useSelector(state => state.auth._id)
    const isMyPacks = useSelector(state => state.packs.isMyPacks)
    const pageCount = useSelector(state => state.packs.pageCount)
    const page = useSelector(state => state.packs.page)
    const cardPacksTotalCount = useSelector(state => state.packs.cardPacksTotalCount)
    const dispatch = useDispatch()
    const [inputModal, setInputModal] = useState('')
    const [modal, setModal] = useState(false)
    let pagesArray = []
    // const [myPacks, setMyPacks] = useState(false)

    const getMyPack = () => {
        dispatch(setPage(1))
        dispatch(setPageCount(4))
        dispatch(getPacksThunk(userId))
        dispatch(setIsMyPacks(true))
    }
    const getAllPack = () => {
        dispatch(setPage(1))
        dispatch(setPageCount(4))
        dispatch(getPacksThunk())
        dispatch(setIsMyPacks(false))
    }

    const addNewPackOpenModal = () => {
        setModal(true)
    }
    const addNewPack = () => {
        if (isMyPacks){
            dispatch(createPackThunk(inputModal,userId))
            setModal(false)
            setInputModal('')
        }
        else{
            dispatch(createPackThunk(inputModal))
            setModal(false)
            setInputModal('')
        }
    }
    const setCurPageCount = (value) => {
        dispatch(setPage(1))
        if (isMyPacks) {
            dispatch(setPageCount(value))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setPageCount(value))
            dispatch(getPacksThunk())
        }
    }

    const setCurPage = (page) => {
        if (isMyPacks) {
            dispatch(setPage(page))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setPage(page))
            dispatch(getPacksThunk())
        }
    }

    useEffect(() => {
        dispatch(getPacksThunk())
    }, [])

    return (
        <div className='packList'>
            <div className='packListHeader'>
                <h2>Packs List</h2>
                <MyButton onClick={getMyPack}
                          className={isMyPacks ? "PackListBtn_active" : "PackListBtn_passive"}>My</MyButton>
                <MyButton onClick={getAllPack}
                          className={isMyPacks ? "PackListBtn_passive" : "PackListBtn_active"}>All</MyButton>
            </div>
            <div className='searchAndBtn'>
                <SearchForm/>
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
            <Paginator
                pagesArray={pagesArray}
                page={page}
                cardPacksTotalCount={cardPacksTotalCount}
                pageCount={pageCount}
                onChangeCurPage={setCurPage}
                onChangeCurPageCount={setCurPageCount}
            />
        </div>
    );
};

export default PacksList;