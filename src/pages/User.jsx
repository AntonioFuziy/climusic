import React, { Component } from 'react';
import { Credentials } from '../Credentials';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/User.css'
import '../parameters/playlists.json'

export default class User extends Component{

    constructor(props){
        super(props);
        const fs = require('fs');
        var data = "playlists.json"
        var mydata = JSON.parse(data);

        this.onChangeChill = this.onChangeChill.bind(this);
        this.onChangeMood = this.onChangeMood.bind(this);
        this.onChangeHappy = this.onChangeHappy.bind(this);
        this.onChangeEnergy = this.onChangeEnergy.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            chill: '',
            mood: '',
            happy:'',
            energy: ''
        };
        /*
        onChangeChill(e){
            this.setState({
                chill: e.target.value
            });
        }
        onChangeMood(e){
            this.setState({
                mood: e.target.value
            });
        }
        onChangeHappy(e){
            this.setState({
                happy: e.target.value
            });
        }
        onChangeEnergy(e){
            this.setState({
                energy: e.target.value
            });
        }
        onSubmit(e){
            e.preventDefault();
        }
        savingJson(){
            fs.writeFile('playlists.json', data, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved.");
            });
        }*/

            const user = {
                chill: this.state.chill,
                mood: this.state.mood,
                happy: this.state.happy,
                energy: this.state.energy
            }
            console.log(user);

            this.setState({
                chill: '',
                mood: '',
                happy: '',
                energy: ''
            });
  return (
    
    <form onSubmit={this.onSubmit} className="login-form">
        <h3 className="title">Playlists a serem tocadas para cada Tempo</h3>
        <div className="form-group">
            <label htmlFor="username-input">Chill</label>
            <input type="text" id="username-input" className="form-control" required value={this.state.chill} onChange={this.onChangeChill}/>
        </div>

        <div className="form-group">
            <label htmlFor="email-input">Mood:</label>
            <input type="text" id="email-input" className="form-control" required value={this.state.mood} onChange={this.onChangeMood}/>
        </div>

        <div className="form-group">
            <label htmlFor="password-input">Happy:</label>
            <input type="password" id="password-input" className="form-control" required value={this.state.happy} onChange={this.onChangeHappy}/>
        </div>
        <div className="form-group">
            <label htmlFor="password-input">Energy:</label>
            <input type="password" id="password-input" className="form-control" required value={this.state.energy} onChange={this.onChangeEnergy}/>
        </div>

        <button type="submit" className="btn btn-primary submit-login">Sign in</button>
    </form>
  );
}

}
//export default User;
