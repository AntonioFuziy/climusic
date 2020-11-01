import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../styles/Weather.css";

import Clouds from '../images/cloudy.jpg';
import Clear from '../images/clear.jpg';
import Rain from '../images/rain.jpg';

import PlaylistTypes from '../parameters/playlists.json';

export default class Weather extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            city : '',
            weather: '',
            gender: '',
            images: [Clouds, Clear, Rain],
            image: null,
            musics: [],
            playlist: '',
            types: null
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
        this.setState({
            types: PlaylistTypes
        })
        console.log(this.state.types.chill)
        if (weather === "Clouds"){
            this.setState({
                gender: "mood",
                image: this.state.images[0],
                playlist: this.state.types.mood
            })
        }

        else if (weather === "Clear"){
            this.setState({
                gender: "chill",
                image: this.state.images[1],
                playlist: this.state.types.chill
            })
        }

        else if (weather === "Rain"){
            this.setState({
                gender: "mood",
                image: this.state.images[2],
                playlist: this.state.types.mood
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
            axios('https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa("448a1375249b40bba54742bb73956885" + ':' + "8e9894dbbe4a4c7f8bd25482dfa879d6")
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
                }).then(tokenResponse => {
                    console.log(this.state.playlist)

                this.setState({
                    token: tokenResponse.data.access_token
                });

                axios(`https://api.spotify.com/v1/playlists/${this.state.playlist}/tracks?limit=100`, {
                    method: "GET",
                    headers: { "Authorization": "Bearer " + this.state.token}
                  }).then(tracksResponse => {
                      console.log(tracksResponse.data.items)
                  this.setState({
                    musics: tracksResponse.data.items
                })
              })
            });
        })
        .catch(error => console.log("Error", error));
        console.log('Your input value is: ' + this.state.city)
    }
    
    render(){
        var climateImage = <img src={this.state.image} alt=""/>

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
                    <ul className="musics">
                        {this.state.musics.map((item, index) => 
                            <li key={index} className="music">
                            <img src={item.track.album.images[0].url} alt="" className="album-image"/>
                            <h3 className="music-title">{item.track.name}</h3>
                        </li>)}
                    </ul>
                    
                    <Link to="/">List</Link>
                </div>
            </div>
        );
    }
}