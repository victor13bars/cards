import React, {useState} from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"
import {useDispatch} from "react-redux";
import {getPacksThunk} from "../redux/pack-reducer";

const TableData = ({dataArray, columnName}) => {
    const dispatch = useDispatch()
    const [sort, setSort] = useState({
        up: false,
        down: true
    })
    console.log(sort)

    const SortUp = () => {
        dispatch(getPacksThunk("", "1updated"))
        setSort({...sort, down: false, up: true})
    }
    const SortDown = () => {
        dispatch(getPacksThunk("", "0updated"))
        setSort({...sort, up: false, down: true})
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columnName.map(function (el) {
                            if (el.columnName === "Last updated") {

                                return <th key={el.id}>
                                    {el.columnName}
                                    <MyButton
                                        className={sort.down ? "table_sort_btn_passive" : "table_sort_btn_active"}
                                        onClick={SortUp}
                                    >Up</MyButton>
                                    <MyButton
                                        className={sort.up ? "table_sort_btn_passive" : "table_sort_btn_active"}
                                        onClick={SortDown}
                                    >Down</MyButton>
                                </th>
                            }
                            return <th key={el.id}>{el.columnName}</th>
                        }
                    )}
                </tr>
                </thead>
                <tbody>
                {dataArray.map(el =>
                    <tr key={el._id}>
                        <td>{el.name}</td>
                        <td>{el.cardsCount}</td>
                        <td>{el.updated}</td>
                        <td>{el.user_name}</td>
                        <td>
                            <div className='table_actions_btn'>
                                <MyButton>Delete</MyButton>
                                <MyButton>Edit</MyButton>
                                <MyButton>Learn</MyButton>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default TableData;