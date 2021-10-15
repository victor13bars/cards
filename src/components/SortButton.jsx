import React, {memo} from 'react';
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"
import {logoutThunk} from "../redux/auth-reducer";


const SortButton = memo(({typeSort, startValue, endValue, SortUp, SortDown}) => {
    console.log("SortButton")
    return (
        <div>
            <MyButton
                className={typeSort === startValue ? "table_sort_btn_passive" : "table_sort_btn_active"}
                onClick={SortUp}
            >Up</MyButton>
            <MyButton
                className={typeSort === endValue ? "table_sort_btn_passive" : "table_sort_btn_active"}
                onClick={SortDown}
            >Down</MyButton>
        </div>
    );
})

export default SortButton;