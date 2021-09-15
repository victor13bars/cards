import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksThunk} from "../redux/pack-reducer";
import MyInput from "../components/UI/input/MyInput";
import Table from "../components/TableData";
import TableData from "../components/TableData";
import SearchForm from "../components/SearchForm";

const PacksList = () => {
    const columnNameTable = [
        {id: 1, columnName: 'Pack name'},
        {id: 2, columnName: 'Cards'},
        {id: 3, columnName: "LastUpdated"},
        {id: 4, columnName: "Created By"},
        {id: 5, columnName: "Actions"}
    ]
    const packs = useSelector(state => state.packs.cardPacks)
    console.log(packs)
    const dispatch = useDispatch()

    const getSearchPacks = (searchValue) => {
        dispatch(getPacksThunk(searchValue))
    }
    // const btnSearch = () => {
    //     dispatch(getPacksThunk(searchValue))
    //     setSearchValue("")
    // }
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
                <MyButton>Add new pack</MyButton>
            </div>
            <TableData columnName={columnNameTable} dataArray={packs}/>
        </div>
    );
};

export default PacksList;