import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import SearchForm from "../components/SearchForm";
import TableForPacks from "../components/TableForPacks";
import {useDispatch, useSelector} from "react-redux";
import {getCardsThunk} from "../redux/card-reducer";
import TableForCards from "../components/TableForCards";
import '../styles/App.css'
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";

const CardsList = () => {
    const dispatch = useDispatch();
    const {packId} = useParams();

    useEffect(() => {
        dispatch(getCardsThunk(packId))
    }, [packId])

    return (
        <div className='packList'>
            <div className='packListHeader'>
                <h2>Cards List</h2>
            </div>
            <div className='searchAndBtn'>
                <SearchForm/>
                <MyButton>Add new card</MyButton>
                {/*<MyModal visible={modal} setVisible={setModal}>*/}
                {/*    <h3>Add new pack</h3>*/}
                {/*    <MyInput value={inputModal} placeholder='Name pack'*/}
                {/*             onChange={(e) => setInputModal(e.target.value)}/>*/}
                {/*    <div className='addNewPackModalBtn'>*/}
                {/*        <MyButton onClick={() => setModal(false)}>Cancel</MyButton>*/}
                {/*        <MyButton onClick={addNewPack}>Save</MyButton>*/}
                {/*    </div>*/}
                {/*</MyModal>*/}
            </div>
            <TableForCards/>
        </div>
    );
};

export default CardsList;