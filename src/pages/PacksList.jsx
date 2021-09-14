import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import {useDispatch, useSelector} from "react-redux";
import {getPacksThunk} from "../redux/pack-reducer";
import MyInput from "../components/UI/input/MyInput";
import Table from "../components/TableData";
import TableData from "../components/TableData";


const PacksList = () => {
    const packs = useSelector(state => state.packs.cardPacks)
    console.log(packs)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState("")

    const btnSearch = () => {
        dispatch(getPacksThunk(searchValue))
        setSearchValue("")
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
                <div className='search'>
                    <MyInput value={searchValue} placeholder='Search name'
                             onChange={(e) => setSearchValue(e.target.value)}/>
                    <MyButton onClick={btnSearch}>Search</MyButton>
                </div>
                <MyButton>Add new pack</MyButton>
            </div>
            <TableData pack={packs}/>
        </div>
    );
};

export default PacksList;