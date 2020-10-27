import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./pages/ListSpotify";
import Usuarios from './pages/usuarios';
import Weather from './pages/Weather';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListSpotify}/>

                <Route path="/weather" component={Weather}/>

                <Route path="/usuarios" component={Usuarios}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;