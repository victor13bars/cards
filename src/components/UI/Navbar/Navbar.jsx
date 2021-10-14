import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Navbar.module.css'
import MyButton from "../button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../../redux/auth-reducer";


const MyNavbar = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={classes.navbar}>
            {isAuth ?
                <div className={classes.navbar__links}>
                    <div className={classes.navbar__links_auth}>
                        <NavLink to='/profile' activeClassName={classes.navbar__links_active}>Profile</NavLink>
                        <NavLink to='/packsList'  activeClassName={classes.navbar__links_active}>PacksList</NavLink>
                    </div>
                    <MyButton onClick={logout}>Logout</MyButton>
                </div>
                :
                <div className={classes.navbar__links}>
                    <NavLink to='/login' activeClassName={classes.navbar__links_active}>Login</NavLink>
                    <NavLink to='/registration' activeClassName={classes.navbar__links_active}>Registration</NavLink>
                    <NavLink to='/recovery' activeClassName={classes.navbar__links_active}>PasswordRecovery</NavLink>
                    <NavLink to='/newPassword' activeClassName={classes.navbar__links_active}>NewPassword</NavLink>
                </div>
            }
        </div>
    );
};

export default MyNavbar;