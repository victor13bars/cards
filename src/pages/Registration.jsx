import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Registration = () => {
    return (
        <div className='register'>
            <h2>Sign Up</h2>
            <form action="">
                <MyInput type='text' placeholder='Email'/>
                <MyInput type='password' placeholder='Password'/>
                <MyInput type='password' placeholder='Password'/>
                <MyButton style={{margin:'10px'}}>Cancel</MyButton>
                <MyButton style={{margin:'10px'}}>Register</MyButton>
            </form>
        </div>
    );
};

export default Registration;