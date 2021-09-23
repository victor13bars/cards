import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getPageCount, getPagesArray} from "../../utils/pages";
import classes from "./Paginator.module.css"

const Paginator = () => {
    const cardPacksTotalCount = useSelector(state => state.packs.cardPacksTotalCount)
    const page = useSelector(state => state.packs.page)
    const pageCount = useSelector(state => state.packs.pageCount)
    const [totalPages, setTotalPages] = useState(getPageCount(cardPacksTotalCount, pageCount))
    let pagesArray = getPagesArray(totalPages)

    console.log("TOtal", totalPages)
    return (
        <div className={classes.page__wrapper}>
            {pagesArray.map(p =>
                <span key={p} className={page === p ? classes.page + " " + classes.page__current : classes.page}>{p}</span>
            )}
        </div>
    );
};

export default Paginator;