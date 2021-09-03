import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
    return (
        <div className='login'>
            <h2>Sign In</h2>
            <form action="">
                <MyInput type='text' placeholder='Email'/>
                <MyInput type='password' placeholder='Password'/>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;