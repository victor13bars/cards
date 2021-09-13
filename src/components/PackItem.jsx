import React from 'react';
import MyButton from "./UI/button/MyButton";
import "../styles/App.css"

const PackItem = ({pack}) => {

    return (
        <div className='pack'>
            <div className="pack_content">
                <div>{pack.name}</div>
                <div className='pack_el'>{pack.cardsCount}</div>
                <div className='pack_el'>{pack.updated}</div>
                <div className='pack_el'>{pack.createdBy}</div>
                <div className="pack_btns">
                    <MyButton className='btn_del'>Delete</MyButton>
                    <MyButton>Edit</MyButton>
                    <MyButton>Learn</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PackItem;