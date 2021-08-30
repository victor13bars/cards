import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='registration'>Registration</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/recovery'>PasswordRecovery</Link>
            <Link to='/newPassword'>NewPassword</Link>
            <Link to='/error'>404</Link>
        </div>
    );
};

export default Navbar;