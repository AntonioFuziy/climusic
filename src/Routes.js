import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./ListSpotify";
import Usuarios from './usuarios';
import Weather from './Weather';

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