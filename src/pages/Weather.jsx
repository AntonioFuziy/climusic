import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../styles/Weather.css";

import Clouds from '../images/cloudy.png';
import Clear from '../images/sunny.png';
import Rain from '../images/rain.png';
import Snow from '../images/snowing.png';
import Drizzle from '../images/drizzle.png';
import Thunderstorm from '../images/storm.png';
import Foggy from '../images/foggy.png';
import Pressure from '../images/pressure.png';
import Wind from '../images/windy.png';
import Humidity from '../images/drop.png';
import Sunrise from '../images/dawn.png';
import Sunset from '../images/sunset.png';
import Clock from '../images/clock.png'

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
            descricao: "    A playlist para aquelas hora que está sem energia e com muita coisa para fazer, um energético sonoro",
            types: null,
            temperature: "",
            city_name: '',
            sunrise: "",
            sunset: "",
            temp_max: "",
            temp_min: "",
            humidity: null,
            altitude: null,
            pressure: null,
            feels_like: null,
            vel_vent: null,
            localTime: null
        }
          
        this.updateCity = this.updateCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }
          
    updateCity(event){
        this.setState({city : event.target.value})
    }
    updateSunrise(epoch, timezone){
        var epochMiliSecond = epoch*1000 //new Date(1601528702*1000);
        console.log(epochMiliSecond.toLocaleString()); // 01/10/2020, 10:35:02
        var date = new Date(epochMiliSecond)
        var hours = date.getUTCHours() + timezone
        var minutes = date.getUTCMinutes()
        var minutesString = minutes.toString()
        if (minutesString.length>1){
            var time = hours.toString() +":" + minutes.toString()
        }else{
            var time = hours.toString() +":0" + minutes.toString()
        }
            this.setState({sunrise : time})
    }
    updateSunset(epoch, timezone){
        var epochMiliSecond = epoch*1000 //new Date(1601528702*1000);
        console.log(epochMiliSecond.toLocaleString()); // 01/10/2020, 10:35:02
        var date = new Date(epochMiliSecond)
        var hours = date.getUTCHours() + timezone
        var minutes = date.getUTCMinutes()
        var minutesString = minutes.toString()
        if (minutesString.length>1){
            var time = hours.toString() +":" + minutes.toString()
        }else{
            var time = hours.toString() +":0" + minutes.toString()
        }
            this.setState({sunset : time})
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
                    playlist: this.state.types.mood.id,
                    descricao: this.state.types.mood.description,
                    weather: "Nublado"
                });
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Sand":
            case "Dust":
            case "Ash":
            case "Squall":
            case "Tornado":
            case "Atmosphere":

            this.setState({
                gender: "mood",
                image: this.state.images[6],
                playlist: this.state.types.mood.id,
                descricao: this.state.types.mood.description,
                weather: "Neblina"
            });
                break;            
            case "Clear":
                this.setState({
                    gender: "happy",
                    image: this.state.images[1],
                    playlist: this.state.types.happy.id,
                    descricao: this.state.types.happy.description,
                    weather: "Limpo"
                });
                break;

            case "Rain":
                this.setState({
                    gender: "mood",
                    image: this.state.images[2],
                    playlist: this.state.types.mood.id,
                    descricao: this.state.types.mood.description,
                    weather: "Chovendo"
                });
                break;

            case "Snow":
                this.setState({
                    gender: "mood",
                    image: this.state.images[3],
                    playlist: this.state.types.mood.id,
                    descricao: this.state.types.mood.description,
                    weather: "Nevando"
                });
                break;

            case "Thunderstorm":
                this.setState({
                    gender: "energy",
                    image: this.state.images[5],
                    playlist: this.state.types.energy.id,
                    descricao: this.state.types.energy.description,
                    weather: "Tempestade"
                });
                break;

            case "Drizzle":
                this.setState({
                    gender: "mood",
                    image: this.state.images[4],
                    playlist: this.state.types.mood.id,
                    descricao: this.state.types.mood.description,
                    weather: "Chuviscando"
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
            var epochSunrise = response.data.sys.sunrise
            var epochSunset = response.data.sys.sunset
            var timeZone = response.data.timezone/3600
            var feels_like = response.data.main.feels_like
            var temp_min = response.data.main.temp_min
            var temp_max = response.data.main.temp_max
            var humidity = response.data.main.humidity
            var pressure = response.data.main.pressure
            var vel_vent = response.data.wind.speed
            var now = new Date;
            var hours = now.getUTCHours() + timeZone
            var minutes = now.getUTCMinutes()
                var minutesString = minutes.toString()
                if (minutesString.length>1){
                    var time = hours.toString() +":" + minutes.toString()
                }else{
                    var time = hours.toString() +":0" + minutes.toString()
                }
            console.log(time)
                    
            

            console.log(timeZone)
            console.log(weather)
            this.updateSunset(epochSunset, timeZone)
            this.updateSunrise(epochSunrise, timeZone)
            
            this.getWeather(weather)
            this.setState({
                temperature: Math.round(temperature-273)+"°C",
                temp_min: "Min: " + Math.round(temp_min-273) + "°C",
                temp_max: "Max: " + Math.round(temp_max-273) + "°C",
                feels_like: "Sensação: " + Math.round(feels_like-273)+"°C",
                humidity: "Umidade: " + humidity + "%",
                pressure: "Pressão: " + pressure + " MB",
                vel_vent: "Vento: " + vel_vent + " km/h",
                city_name: city,
                localTime: "Horário Local: "+time
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
            var sunriseImage = <img src={Sunrise} className="sunrise-img" alt=""/>
            var sunsetImage = <img src={Sunset} className="sunset-img" alt=""/>
            var velVentImage = <img src={Wind} className="vel-vent-img" alt=""/>
            var pressureImage = <img src={Humidity} className="pressure-img" alt=""/>
            var humidityImage = <img src={Pressure} className="humidity-img" alt=""/>
            var clockImage = <img src={Clock} className="altitude-img" alt=""/>
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
            <div className="container-content">
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

                    <div className="playlist">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{this.state.descricao}</p>
                            </div>
                        </div>
                        {widgetPlaylist}
                    </div>

                    <div className="weather">
                        <div className="weather-box">
                            {climateImage}
                            <h3 className="city-title">{this.state.city_name}</h3>
                            {sunriseImage}
                            <p className="sunrise">{this.state.sunrise}</p>
                            {sunsetImage}
                            <p className="sunset">{this.state.sunset}</p>
                            <p className="weather-description">{this.state.weather}</p>
                            <p className="temperature">{this.state.temperature}</p>
                            <p className="temp-max">{this.state.temp_max}</p>
                            <p className="temp-min">{this.state.temp_min}</p>
                            <p className="feels-like">{this.state.feels_like}</p>
                            {/* <p className="time-now">{this.state.time_now}</p> */}
                            <ul className="list-group">
                                <li className="altitude list-group-item">
                                    {clockImage}
                                    <p className="advanced">{this.state.localTime}</p>
                                </li>
                                <li className="humidity list-group-item">
                                    {humidityImage}
                                    <p className="advanced">{this.state.humidity}</p>
                                </li>
                                <li className="pressure list-group-item">
                                    {pressureImage}
                                    <p className="advanced">{this.state.pressure}</p>
                                </li>
                                <li className="vel-vent list-group-item">
                                    {velVentImage}
                                    <p className="advanced">{this.state.vel_vent}</p>
                                </li>
                            </ul>
                        </div>
                        {/* <p className="gender">{this.state.gender}</p> */}
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