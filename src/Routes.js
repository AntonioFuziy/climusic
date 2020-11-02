import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./pages/ListSpotify";
import Weather from './pages/Weather';
import Login from './pages/Login';
import User from './pages/User';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListSpotify}/>

                <Route path="/weather" component={Weather}/>

                <Route path="/login" component={Login}/>

                <Route path="/user" component={User}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;