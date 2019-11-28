// This page uses the React Router library to make links to navigate from page to page
import React, { useState } from 'react';
import '../App.css';
import Home from './Home';
import FetchItems from './FetchItems';
import AddItem from './AddItem';
import JoinList from './JoinList';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function RouterComponent() {

    // if setView is false, show token generator button, if true, show home
    const [needToken, setNeedToken] = useState(false)
    const uniqueToken = localStorage.getItem("uniqueToken")

    // const checkView = () => {
    //     if (uniqueToken === null) {
    //         hasToken(false)
    //     } else {
    //         hasToken(true)
    //     }
    // }

    const setView = () => {
        // if (uniqueToken === null) {
        //     hasToken(false)
        // } else {
        //     hasToken(true)
        // }

        if (token === false) {
            return (
                <Route path="">
                    <Home />
                </Route>
            )
        } else {
            return (
                <Route path="">
                    <FetchItems />
                </Route>
            )
        }
    }


    return (
        <Router>
            <Link to="/list">List</Link>
            <Link to="/add">Add</Link>
            {/* For next week we will take these and move them 
            to a nav component, and then we will import that nav
            into the FetchItems component */}

            <Switch>
                <Route path="/list">
                    <FetchItems />
                </Route>
                <Route path="/add">
                    <AddItem />
                </Route>
                <Route path="/join">
                    <JoinList />
                </Route>
                <Route path="">
                    {/* should the list or home be shown? */}
                    { setView() }
                    {/* { token === false ? <Home/> : <FetchItems/> } */}
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
