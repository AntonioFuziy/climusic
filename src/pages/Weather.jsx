import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../styles/Weather.css";

import DefaultImage from '../images/default.jpg';
import Clouds from '../images/cloudy.png';
import Clear from '../images/sunny.png';
import Rain from '../images/rain.png';
import Snow from '../images/snowing.png';
import Drizzle from '../images/drizzle.png';
import Thunderstorm from '../images/storm.png';
import Foggy from '../images/foggy.png';

import logo from '../images/logo.png';

import PlaylistTypes from '../parameters/playlists.json';

export default class Weather extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            city : '',
            weather: '',
            gender: '',
            images: [Clouds, Clear, Rain, Snow, Drizzle, Thunderstorm, Foggy],
            image: null,
            musics: [],
            playlist: '',
            types: null,
            temperature: "",
            city_name: ''
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

    signOut(){
        localStorage.removeItem("email");
        window.location.href = "http://localhost:3000/"
    }

    renderImage(weather){
        this.setState({
            types: PlaylistTypes
        })

        switch(weather){
            case "Clouds":
                this.setState({
                    gender: "mood",
                    image: this.state.images[0],
                    playlist: this.state.types.mood,
                    weather: "Nublado"
                });
                break;
            case "Fog":
            this.setState({
                gender: "mood",
                image: this.state.images[6],
                playlist: this.state.types.mood,
                weather: "Neblina"
            });
            break;
            case "Clear":
                this.setState({
                    gender: "happy",
                    image: this.state.images[1],
                    playlist: this.state.types.happy,
                    weather: "Limpo"
                });
                break;

            case "Rain":
                this.setState({
                    gender: "mood",
                    image: this.state.images[2],
                    playlist: this.state.types.mood,
                    weather: "Chovendo"
                });
                break;

            case "Snow":
                this.setState({
                    gender: "mood",
                    image: this.state.images[3],
                    playlist: this.state.types.mood,
                    weather: "Nevando"
                });
                break;

            case "Thunderstorm":
                this.setState({
                    gender: "energy",
                    image: this.state.images[5],
                    playlist: this.state.types.energy,
                    weather: "Tempestade"
                });
                break;

            case "Drizzle":
                this.setState({
                    gender: "mood",
                    image: this.state.images[4],
                    playlist: this.state.types.mood,
                    weather: "Chuviscando"
                });
                break;

            case "Atmosphere":
                this.setState({
                    gender: "mood",
                    image: this.state.images[6],
                    playlist: this.state.types.mood,
                    weather: "Neblina"
                });
                break;

            default:
                console.log("Other genders");
        }
    }
    
    handleSubmit(){
        var city = this.state.city;
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e059725431697265ee7fc75a3baa2bab`

        axios
        .get(API_URL)
        .then(response => {
            console.log(response.data)
            var weather = response.data.weather[0].main
            var temperature = response.data.main.temp
            var city = response.data.name

            console.log(weather)
            
            this.getWeather(weather)
            this.setState({
                temperature: Math.round(temperature-273)+"°C",
                city_name: city
            })
            this.renderImage(weather)
            axios('https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa("448a1375249b40bba54742bb73956885" + ':' + "8e9894dbbe4a4c7f8bd25482dfa879d6")
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
                }).then(tokenResponse => {
                this.setState({
                    token: tokenResponse.data.access_token
                });
            });
        })
        .catch(error => console.log("Error", error));
        console.log('Your input value is: ' + this.state.city)
    }
    
    render(){
        if (this.state.image != null){
            var climateImage = <img src={this.state.image} className="climate-image" alt=""/>
        } 
        if (this.state.playlist != ''){
            var widgetPlaylist = <iframe src={"https://open.spotify.com/embed/playlist/"+this.state.playlist} 
            className="player"
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
            </iframe>
        } else{
            var widgetPlaylist = <iframe src={"https://open.spotify.com/embed/playlist/4QkCEiUjKbhc3mSzQo6ycO"} 
            className="player"
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
            </iframe>
        }

        return(
            <div className="container">
                <div className="box">
                    <form className="city-form">
                        <img src={logo} className="logo" alt=""/>
                        <div className="form-group">
                            <label htmlFor="cidade-input">Qual cidade você está nesse momento?</label>
                            <input id="cidade-input" className="form-control" type="text" onChange={this.updateCity} name="city"/>
                        </div>
                        <button id="submitCidade" className="btn btn-primary search-button" type="button" onClick={this.handleSubmit}>Pesquisar</button>
                        <button id="sign-out" className="btn btn-danger sign-out-button" type="button" onClick={this.signOut}>Sair</button>
                    </form>

                    <div className="weather">
                        <div className="weather-box">
                            {climateImage}
                            <h3 className="city-title">{this.state.city_name}</h3>
                            <p className="weather-description">{this.state.weather}</p>
                            <p className="temperature">{this.state.temperature}</p>
                        </div>
                        {/* <p className="gender">{this.state.gender}</p> */}
                        {widgetPlaylist}
                        {/* <ul className="musics">
                            {this.state.musics.map((item, index) => 
                                <li key={index} className="music">
                                <img src={item.track.album.images[0].url} alt="" className="album-image"/>
                                <h3 className="music-title">{item.track.name}</h3>
                            </li>)}
                        </ul> */}
                        
                        {/* <Link to="/">List</Link> */}
                    </div>
                </div>
            </div>
        );
    }
}