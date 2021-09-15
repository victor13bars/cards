import React from 'react';
import SearchForm from "../components/SearchForm";
import TableData from "../components/TableData";

const CardsList = () => {
    const columnNameTable = [
        {id: 1, columnName: 'Question'},
        {id: 2, columnName: 'Answer'},
        {id: 3, columnName: "Last updated"},
        {id: 4, columnName: "Grade"},
        {id: 5, columnName: "Actions"}
    ]
    return (
        <div>
            CardsList
            <SearchForm/>
            <TableData columnName={columnNameTable} dataArray={[]} />
        </div>
    );
};

export default CardsList;