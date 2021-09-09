import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Profile = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    if (!isAuth) {
        return <Redirect to='/login'/>
    }
    return (
        <div>
            Profile
        </div>
    );
};

export default Profile;