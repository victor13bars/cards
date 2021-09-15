import React from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";

const TableData = ({dataArray,columnName}) => {

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {columnName.map(el=>
                        <th key={el.id}>{el.columnName}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {dataArray.map(el=>
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