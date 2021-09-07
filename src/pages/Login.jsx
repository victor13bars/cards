import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, setLoginInfo} from "../redux/auth-reducer";
import {authAPI} from "../api/api";
import Loader from "../components/UI/Loader/Loader";
import {Redirect} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isError = useSelector(state => state.auth.isError)
    console.log(";lk;lk;kllk;")

    const loginSubmit = (e) => {
        e.preventDefault()
        let form = document.forms.login.elements
        dispatch(loginThunk(form.email.value, form.password.value, form.rememberMe.checked))
    }

    if (isLoading) {
        return <Loader/>
    }
    if (isError) {
        return <Redirect to='/error'/>
    }
    return (
        isAuth
            ?
            <Redirect to='/profile'/>
            :
            <div className='login'>
                <h2>Sign In</h2>
                <form name='login' action="">
                    <MyInput name='email' type='text' placeholder='Email'/>
                    <MyInput name='password' type='password' placeholder='Password'/>
                    <MyInput name='rememberMe' type='checkBox'/>
                    <MyButton onClick={loginSubmit}>Login</MyButton>
                </form>

            </div>
    );
};

export default Login;