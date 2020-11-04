import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./pages/ListSpotify";
import Weather from './pages/Weather';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro';
import User from './pages/User';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/listSpotify" component={ListSpotify}/>

                <Route path="/weather" component={Weather}/>

                <Route path="/" exact component={Login}/>

                <Route path="/cadastro" component={Cadastro}/>

                <Route path="/user" component={User}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;