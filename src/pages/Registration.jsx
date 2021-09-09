import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../redux/auth-reducer";
import Loader from "../components/UI/Loader/Loader";
import {Redirect} from "react-router-dom";

const Registration = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)
    const isError = useSelector(state => state.auth.isError)
    const isCreatedUser = useSelector(state => state.auth.isCreatedUser)
    const register = (e) => {
        e.preventDefault()
        let form = document.forms.register.elements
        dispatch(registerThunk(form.email.value, form.password.value))
    }

    if (isLoading) {
        return <Loader/>
    }
    if (isError) {
        return <Redirect to='/error'/>
    }
    if (isCreatedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <div className='register'>
            <h2>Sign Up</h2>
            <form name='register' action="" onSubmit={register}>
                <MyInput name='email' type='text' placeholder='Email'/>
                <MyInput name='password' type='password' placeholder='Password'/>
                {/*<MyInput type='password' placeholder='Confirm Password'/>*/}
                <MyButton>Register</MyButton>
            </form>
        </div>
    );
};

export default Registration;