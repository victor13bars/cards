import React from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import PackItem from "../components/PackItem";

const PacksList = () => {
    return (
        <div>
            <PackItem pack={{name:"MyPack",cardsCount:3,updated:"18.03.2012",createdBy:'Vitya Semashko'}}/>
        </div>
    );
};

export default PacksList;