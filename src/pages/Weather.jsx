import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ListSpotify.css'

export default class Weather extends Component {
    constructor(props){
        super(props);

        this.state = {
            city : '',
            weather: ''
        }
          
        this.updateCity = this.updateCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
          
          
    updateCity(event){
        this.setState({city : event.target.value})
    }
    
    getWeather(weather){
        this.setState({
            weather: weather
        })
    }

    renderImage(weather){
        if (weather === "Clouds"){
            console.log("Musica mais triste")
            
        }

        else if (weather === "Clear"){
            console.log("Chill music")
        }

        else{
            console.log("Other genders")
        }
    }
    
    handleSubmit(){
        var city = this.state.city;
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e059725431697265ee7fc75a3baa2bab`

        axios
        .get(API_URL)
        .then(response => {
            var weather = response.data.weather[0].main

            console.log(weather)
            
            this.getWeather(weather)
            this.renderImage(weather)
        })
        .catch(error => console.log("Error", error));
        console.log('Your input value is: ' + this.state.city)
    }
    
    render(){
        return(
            <div id="geral">
                <form id="formulario">
                    <label htmlFor="cidadeInput">Qual cidade gostaria de pesquisar?</label>
                    <input id="cidadeInput" type="text" onChange={this.updateCity} name="city"/>
                </form>
                <button id="submitCidade" onClick={this.handleSubmit}>Pesquisar</button>

                <div className="weather">
                    <p>{this.state.weather}</p>

                    <Link to="/">List</Link>
                </div>
            </div>
        );
    }
}