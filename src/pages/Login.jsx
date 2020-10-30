import React, { Component } from 'react';
import axios from 'axios';

import "../styles/Login.css"

export default class Login extends Component{

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

    // componentDidMount(){
    //     this.setState({
    //         username: 'teste',
    //         email: 'teste@gmail.com',
    //         password: 'senha123'
    //     })
    // }

    onChangeUsername(e){
        this.setState = ({
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

        window.location = "/";
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="username-input">Username:</label>
                    <input type="text" id="username-input"/>

                    <label htmlFor="email-input">Email:</label>
                    <input type="text" id="email-input"/>

                    <label htmlFor="password-input">Password:</label>
                    <input type="text" id="password-input"/>

                    <button type="submit">Sign in</button>
                </form>
            </div>
        )
    }
}