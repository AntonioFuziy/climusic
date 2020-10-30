import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./pages/ListSpotify";
import Usuarios from './pages/usuarios';
import Weather from './pages/Weather';
import Login from './pages/Login';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListSpotify}/>

                <Route path="/weather" component={Weather}/>

                <Route path="/usuarios" component={Usuarios}/>

                <Route path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;