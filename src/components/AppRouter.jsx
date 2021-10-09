import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routers/routers";
import {authMeThunk} from "../redux/auth-reducer";

const AppRouter = () => {
    const isAuth = useSelector(state => state.auth.isAuth)


    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/profile'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/login'/>
            </Switch>
    );
};

export default AppRouter;