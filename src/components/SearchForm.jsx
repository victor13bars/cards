import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import '../styles/App.css'

const SearchForm = ({searchCallBack,placeholder}) => {
    const [searchLocValue, setSearchLocValue] = useState("")
    console.log(searchLocValue)
    const btnClickHandler = () => {
        searchCallBack(searchLocValue)
        setSearchLocValue("")
    }
    return (
        <div className='search'>
            <MyInput value={searchLocValue} placeholder={placeholder}
                     onChange={(e) => setSearchLocValue(e.target.value)}/>
            <MyButton onClick={btnClickHandler}>Search</MyButton>
        </div>
    );
};

export default SearchForm;