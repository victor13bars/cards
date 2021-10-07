import React from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecover";
import PasswordNew from "./pages/PasswordNew";
import Error from "./pages/Error";
import {useSelector} from "react-redux";
import PacksList from "./pages/PacksList";
import CardsList from "./pages/CardsList";
import LearnPage from "./pages/LearnPage";
import AppRouter from "./components/AppRouter";

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
            {/*{!isAuth && <Redirect to='/login'/>}*/}
        </BrowserRouter>
    );
}

export default App;
