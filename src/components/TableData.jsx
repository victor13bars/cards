import React from 'react';
import "../styles/App.css"
import Table from "react-bootstrap/Table";
import MyButton from "./UI/button/MyButton";

const TableData = ({pack}) => {

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>LastUpdated</th>
                    <th>Created By</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pack.map(el=>
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