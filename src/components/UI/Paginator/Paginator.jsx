import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPages, getPageCount, getPagesArray} from "../../utils/pagesCreator";
import classes from "./Paginator.module.css"
import {getPacksThunk, setPage, setPageCount} from "../../../redux/pack-reducer";
import MySelect from "../MySelect/MySelect";

const Paginator = ({pagesArray,page,cardPacksTotalCount,pageCount,onChangeCurPage,onChangeCurPageCount}) => {
    const totalPages = Math.ceil(cardPacksTotalCount / pageCount)
    createPages(pagesArray, totalPages, page)

    console.log("TOtal", totalPages)
    return (
        <div className={classes.page__wrapper}>
            {pagesArray.map((p, index) =>
                <span
                    key={index}
                    className={page === p ? classes.page + " " + classes.page__current : classes.page}
                    onClick={() => onChangeCurPage(p)}>
                    {p}
                </span>
            )}
            <div className={classes.selectContainer}>
                <MySelect
                    value={pageCount}
                    onChange={onChangeCurPageCount}
                    defaultValue={pageCount}
                    options={[
                        {value: 5},
                        {value: 10},
                        {value: 15}
                    ]}
                />
            </div>
        </div>
    );
};

export default Paginator;