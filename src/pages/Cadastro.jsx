import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import logo from '../images/logo.png';

import "../styles/Login.css"

export default class Cadastro extends Component{

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.post("http://localhost:5000/users/add", user)
            .then(res => console.log(res.data))
            // .catch(err => console.log(err))

        this.setState({
            username: '',
            email: '',
            password: ''
        });
    }

    render(){
        return(
            <div className="container">
                <div className="box">
                    <div className="side-image">
                        <img src={logo} alt="" className="logo-image"/>
                    </div>
                    <form onSubmit={this.onSubmit} className="login-form">
                        <h3 className="title">Faça parte da nossa comunidade</h3>
                        <div className="form-group">
                            <label htmlFor="username-input">Username:</label>
                            <input type="text" id="username-input" className="form-control" required value={this.state.username} onChange={this.onChangeUsername}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email-input">Email:</label>
                            <input type="text" id="email-input" className="form-control" required value={this.state.email} onChange={this.onChangeEmail}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password-input">Password:</label>
                            <input type="password" id="password-input" className="form-control" required value={this.state.password} onChange={this.onChangePassword}/>
                        </div>

                        <button type="submit" className="btn btn-primary submit-login">Sign in</button>

                        <Link to="/" className="signed">Já sou cadastrado</Link>
                    </form>
                </div>
            </div>
        )
    }
}