import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import 'assets/css/styles.css'
import Guest from 'components/Routes/GuestRoute'
import Member from 'components/Routes/MemberRoute'

import LoginPage from 'pages/Login'
import RegisterPage from 'pages/Register'
import MyClass from 'pages/MyClass'
import Joined from 'pages/Joined';
import DetailsClass from 'pages/DetailsClass';
import Settings from 'pages/Settings';
import Transactions from 'pages/Transactions';

import NotFound from 'pages/Error/ErrorPage'
import Unauthenticated from 'pages/Error/401.js'

import { setAuthorizationHeader } from 'configs/axios'
import { populateProfile } from 'store/actions/users'

import APIusers from 'API/APIusers'

export default function App() {
    const dispatchOne = useDispatch()
    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })

    useEffect(() => {
        let session = null
        if(localStorage.getItem("DEVLITS:token")) {
            session = JSON.parse(localStorage.getItem("DEVLITS:token"))
            setAuthorizationHeader(session.generateToken)

            APIusers.details().then((details) => {
                dispatchOne(populateProfile(details.data))
            })
        }
    }, [dispatchOne])
    return (
        <>
            <Router history={history}>
                <Switch>
                        <Guest path="/login" component={LoginPage}></Guest>
                        <Guest path="/register" component={RegisterPage}></Guest>
                        <Guest path="/private" component={Unauthenticated}></Guest>

                        <Member exact path="/" component={MyClass}></Member>
                        <Member exact path="/joined/:class" component={Joined}></Member>
                        <Member exact path="/courses/:class/:chapter/:uid" component={DetailsClass}></Member>
                        <Member exact path="/courses/:class/" component={DetailsClass}></Member>
                        <Member path="/settings" component={Settings}></Member>
                        <Member path="/transactions" component={Transactions}></Member>

                        <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </>
    )
}   