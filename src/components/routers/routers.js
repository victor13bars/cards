import {Route, Switch} from "react-router-dom";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Profile from "../../pages/Profile";
import PasswordRecovery from "../../pages/PasswordRecover";
import PasswordNew from "../../pages/PasswordNew";
import PacksList from "../../pages/PacksList";
import CardsList from "../../pages/CardsList";
import LearnPage from "../../pages/LearnPage";
import Error from "../../pages/Error";
import React from "react";

export const privateRoutes = [
    {path: '/profile', component: Profile, exact: true},
    {path: '/packsList', component: PacksList, exact: true},
    {path: '/cardsList/:packId', component: CardsList, exact: true},
    {path: '/learnPage/:packId', component: LearnPage, exact: true}
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
    {path: '/registration', component: Registration, exact: true},
    {path: '/newPassword', component: PasswordNew, exact: true},
    {path: '/recovery', component: PasswordRecovery, exact: true},
]
