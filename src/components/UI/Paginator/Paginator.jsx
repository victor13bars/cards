import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPages, getPageCount, getPagesArray} from "../../utils/pagesCreator";
import classes from "./Paginator.module.css"
import {getPacksThunk, setPage} from "../../../redux/pack-reducer";

const Paginator = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector(state => state.packs.cardPacksTotalCount)
    const page = useSelector(state => state.packs.page)
    const pageCount = useSelector(state => state.packs.pageCount)
    const isMyPacks = useSelector(state => state.packs.isMyPacks)
    const userId = useSelector(state => state.auth._id)
    const totalPages = Math.ceil(cardPacksTotalCount/pageCount)
    let pagesArray = []
    createPages(pagesArray,totalPages,page)

    const setCurPage = (page) => {
        if (isMyPacks) {
            dispatch(setPage(page))
            dispatch(getPacksThunk(userId))
        } else {
            dispatch(setPage(page))
            dispatch(getPacksThunk())
        }
    }

    console.log("TOtal", totalPages)
    return (
        <div className={classes.page__wrapper}>
            {pagesArray.map((p, index) =>
                <span
                    key={index}
                    className={page === p ? classes.page + " " + classes.page__current : classes.page}
                    onClick={() => setCurPage(p)}>
                    {p}
                </span>
            )}
        </div>
    );
};

export default Paginator;