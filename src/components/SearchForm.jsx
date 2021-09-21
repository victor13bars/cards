import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import '../styles/App.css'
import {getPacksThunk, setSearchValue} from "../redux/pack-reducer";
import {useDispatch, useSelector} from "react-redux";

const SearchForm = () => {
    const [searchLocValue, setSearchLocValue] = useState("")
    const isMyPacks = useSelector(state => state.packs.isMyPacks)
    const userId = useSelector(state => state.auth._id)
    const dispatch = useDispatch()

    const btnSearch = () => {
        if (isMyPacks) {
            dispatch(setSearchValue(searchLocValue))
            dispatch(getPacksThunk(userId))
            setSearchLocValue("")
            dispatch(setSearchValue(""))
        } else {
            dispatch(setSearchValue(searchLocValue))
            dispatch(getPacksThunk())
            setSearchLocValue("")
            dispatch(setSearchValue(""))
        }
    }
    return (
        <div className='search'>
            <MyInput value={searchLocValue} placeholder='Search name'
                     onChange={(e) => setSearchLocValue(e.target.value)}/>
            <MyButton onClick={btnSearch}>Search</MyButton>
        </div>
    );
};

export default SearchForm;