import React from 'react';
import {Link} from "react-router-dom";
import classes from './Navbar.module.css'
import MyButton from "../button/MyButton";

const Navbar = () => {
    return (
        <div className={classes.navbar}>

            <div className={classes.navbar__links}>
                <Link to='/login'>Login</Link>
                <Link to='registration'>Registration</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/recovery'>PasswordRecovery</Link>
                <Link to='/newPassword'>NewPassword</Link>
                <Link to='/error'>404</Link>
            </div>
            <MyButton>Logout</MyButton>
        </div>
    );
};

export default Navbar;