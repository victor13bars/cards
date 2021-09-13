import React, {useEffect} from 'react';
import MyButton from "../components/UI/button/MyButton";
import '../styles/App.css'
import PackItem from "../components/PackItem";
import {packsAPI} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {getPacksThunk} from "../redux/pack-reducer";

const PacksList = () => {
    const packs = useSelector(state => state.packs.cardPacks)
    console.log(packs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPacksThunk())
    }, [])
    return (
        <div>
            {packs.map(pack =>
                <PackItem pack={pack} key={pack._id}/>
            )}
        </div>
    );
};

export default PacksList;