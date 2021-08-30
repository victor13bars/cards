import React from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import {BrowserRouter, Switch, Route,Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecover";
import PasswordNew from "./pages/PasswordNew";
import Error from "./pages/Error";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/registration' component={Registration}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/recovery' component={PasswordRecovery}/>
                    <Route exact path='/newPassword' component={PasswordNew}/>
                    <Route exact path='/error' component={Error}/>
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
