import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, setLoginInfo} from "../redux/auth-reducer";
import {authAPI} from "../api/api";

const Login = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth)
    const email = useSelector(state => state.auth.email)
    const password = useSelector(state => state.auth.password)
    const rememberMe = useSelector(state => state.auth.rememberMe)
    console.log(state,";lk;lk;kllk;")

    const loginSubmit = (e) => {
        e.preventDefault()
        let form = document.forms.login.elements
        dispatch(loginThunk(form.email.value,form.password.value,form.rememberMe.checked))
    }
    return (
        <div className='login'>
            <h2>Sign In</h2>
            <form name='login' action="">
                <MyInput name='email'  type='text' placeholder='Email'/>
                <MyInput name='password'  type='password' placeholder='Password'/>
                <MyInput name='rememberMe'  type='checkBox'/>
                <MyButton onClick={loginSubmit}>Login</MyButton>
            </form>

        </div>
    );
};

export default Login;