import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import '../styles/App.css'
import {getPacksThunk} from "../redux/pack-reducer";
import {useDispatch} from "react-redux";

const SearchForm = ({getSearchData}) => {
    const [searchValue, setSearchValue] = useState("")
    console.log(searchValue)
    const dispatch = useDispatch()
    const btnSearch = () => {
        getSearchData(searchValue)
        setSearchValue("")
    }
    return (
        <div className='search'>
            <MyInput value={searchValue} placeholder='Search name'
                     onChange={(e) => setSearchValue(e.target.value)}/>
            <MyButton onClick={btnSearch}>Search</MyButton>
        </div>
    );
};

export default SearchForm;