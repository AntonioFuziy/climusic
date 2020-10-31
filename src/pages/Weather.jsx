import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../styles/Weather.css";

import Clouds from '../images/cloudy.jpg'
import Clear from '../images/clear.jpg'

export default class Weather extends Component {
    constructor(props){
        super(props);

        this.state = {
            city : '',
            weather: '',
            gender: '',
            images: [Clouds, Clear],
            image: null
        }
          
        this.updateCity = this.updateCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderImage = this.renderImage.bind(this);
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
            this.setState({
                gender: "Mood",
                image: this.state.images[0]
            })
        }

        else if (weather === "Clear"){
            this.setState({
                gender: "Chill",
                image: this.state.images[1]
            })
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
        var climateImage = <img src={this.state.image} alt="climate"/>

        return(
            <div className="container">
                <form className="city-form">
                    <div className="form-group">
                        <label htmlFor="cidade-input">Qual cidade você está nesse momento?</label>
                        <input id="cidade-input" className="form-control" type="text" onChange={this.updateCity} name="city"/>
                    </div>
                    <button id="submitCidade" className="btn btn-primary" type="button" onClick={this.handleSubmit}>Pesquisar</button>
                </form>

                <div className="weather">
                    <p>{this.state.weather}</p>
                    <p>{this.state.gender}</p>

                    {climateImage}
                    {/* <img src={this.state.weather} alt=""/> */}

                    <Link to="/">List</Link>
                </div>
            </div>
        );
    }
}