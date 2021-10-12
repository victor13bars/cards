import React, {useEffect} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {authMeThunk, loginThunk, setLoginInfo} from "../redux/auth-reducer";
import {authAPI} from "../api/api";
import Loader from "../components/UI/Loader/Loader";
import {Link, Redirect} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isError = useSelector(state => state.auth.isError)
    console.log("LOGINNNNNN")

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
        !isAuth &&
        <div className='login'>
            <h2>Sign In</h2>
            <form name='login' action="" onSubmit={loginSubmit}>
                <MyInput name='email' type='text' placeholder='Email'/>
                <MyInput name='password' type='password' placeholder='Password'/>
                <div className='rememberMe'>
                    <h3>Remember Me</h3>
                    <MyInput name='rememberMe' type='checkBox' placeholder='RememberMe'/>
                </div>
                <div className="forgot">
                    <Link to='/recovery'>Forgot Password</Link>
                </div>
                <MyButton disable={isLoading}>Login</MyButton>
            </form>
            <div className='notAccount'>
                <h3>Don't have an account?</h3>
                <Link to='/registration'>Sign Up</Link>
            </div>

        </div>

    );
};

export default Login;