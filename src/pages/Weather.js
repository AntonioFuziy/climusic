import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ListSpotify.css'

const Weather = () => {
    var city = "Sao Paulo"
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e059725431697265ee7fc75a3baa2bab`

    axios
    .get(API_URL)
    .then(response => {
        var weather = response.data.weather[0].main

        console.log(weather)
    })
    .catch(error => console.log("Error", error));
    
    return(
        <div id="geral">
            <form id="oooo">
                <label for ="cidadeInput">Qual cidade gostaria de pesquisar?
                <input id ="cidadeInput" type="text"/>
                </label>
            </form>
            <button id="submitCidade">Pesquisar</button>

            <div className="weather">
                <Link to="/">List</Link>
            </div>
        </div>
    );
}

export default Weather;