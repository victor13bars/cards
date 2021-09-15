import React from 'react';
import {Link} from "react-router-dom";
import classes from './Navbar.module.css'
import MyButton from "../button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../../redux/auth-reducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={classes.navbar}>

            <div className={classes.navbar__links}>
                <Link to='/login'>Login</Link>
                <Link to='/registration'>Registration</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/recovery'>PasswordRecovery</Link>
                <Link to='/newPassword'>NewPassword</Link>
                <Link to='/packsList'>PacksList</Link>
                <Link to='/cardsList'>CardsList</Link>
                <Link to='/error'>404</Link>
            </div>
            {
                isAuth && <MyButton onClick={logout}>Logout</MyButton>
            }

        </div>
    );
};

export default Navbar;