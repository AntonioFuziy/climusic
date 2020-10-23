import { expr } from 'jquery';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom"; 

import ListSpotify from "./ListSpotify";
import Weather from './Weather';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListSpotify}/>

                <Route path="/weather" component={Weather}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;