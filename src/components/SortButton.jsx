import React from 'react';
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"
const SortButton = ({typeSort,startValue,endValue,SortUp,SortDown}) => {
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
};

export default SortButton;