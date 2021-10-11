import React from 'react';
import {useSelector} from "react-redux";
import "../styles/App.css"
import myPhoto from '../assets/images/MyPhoto.jpg'
import MyButton from "../components/UI/button/MyButton";

const Profile = () => {
    const avatar = useSelector(state => state.auth.avatar)
    const email = useSelector(state => state.auth.email)
    const name = useSelector(state => state.auth.name)
    const publicCardPacksCount = useSelector(state => state.auth.publicCardPacksCount)
    const created = useSelector(state => state.auth.created)
    const verified = useSelector(state => state.auth.verified.toString())

    return (
        <div className="profileContainer">
            <div className='profileImg_wrapper'>
                <div className='profilePhoto'>
                    <img className='profileImg' src={avatar ? avatar : myPhoto} />
                </div>

                <div>
                    <MyButton>Upload photo</MyButton>
                </div>
            </div>
            <div className='profileInfo_wrapper'>
                <p>To change the name, double-click on it</p>
                <p>Name : {name}</p>
                <p>E-mail : {email}</p>
                <p>Count packs : {publicCardPacksCount}</p>
                <p>Created : {created}</p>
                <p>Verified : {verified}</p>
            </div>
        </div>
    );
};

export default Profile;