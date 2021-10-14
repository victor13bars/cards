import React, {useEffect} from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AppRouter from "./components/AppRouter";
import {authMeThunk} from "./redux/auth-reducer";
import MyNavbar from "./components/UI/Navbar/Navbar";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authMeThunk())
    }, [])
    return (
        <BrowserRouter>
            <MyNavbar/>
            <AppRouter/>
            {/*{!isAuth && <Redirect to='/login'/>}*/}
        </BrowserRouter>
    );
}

export default App;
