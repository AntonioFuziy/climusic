import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../images/logo.png';

import "../styles/Login.css"

export default class Login extends Component{

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            allUsers : null,
            email: '',
            password: '',
            txt: '' ,
            status: '',
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         username: 'teste',
    //         email: 'teste@gmail.com',
    //         password: 'senha123'
    //     })
    // }

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
    lookUp(allUsers,emailInput,passwordInput){
        var Status = 0
        // 0=n existe, 1 existe, 2 senha certa, 3 senha errada
        allUsers.map((item,index) => { 
            if (item.email === emailInput){
                console.log("Email existe")
                Status = 1
                if(item.password === passwordInput){
                    console.log("Senha correta")
                    Status = 2
                    console.log(Status)
                    return "Senha correta" 
                }
                else{
                    console.log("Senha Incorreta")
                    Status = 3
                    console.log(Status)
                    return "Senha Incorreta" 
                }     
            }
            else{
                console.log("Email Inexistente, caso esteja correto se cadastre na plataforma")
                Status = 0
                
            }
            console.log(Status)
            return "Email Inexistente, caso esteja correto se cadastre na plataforma"
        });
    }

    onSubmit(e){
        e.preventDefault();
        

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.get("http://localhost:5000/users")
            .then(res =>{ console.log(res.data)
            // .catch(err => console.log(err))

            this.setState({
                allUsers: res.data
            });
            console.log(this.state.allUsers)
            for (var i = 0; i < this.state.allUsers.length; i++) {

                if (this.state.allUsers[i].email === this.state.email){
                    console.log("Email existe")
                    //Status = 1
                    
                    if(this.state.allUsers[i].password === this.state.password){
                        console.log("Senha correta")
                        //Status = 2
                        //console.log(Status)
                        this.setState({
                            status :  "Senha correta"
                        })   
                        console.log(this.state.status)
                        break
                    }
                    else{
                        console.log("Senha Incorreta")
                        //Status = 3
                        ///console.log(Status)
                        this.setState({
                            status :  "Senha Incorreta"
                        }) 
                        console.log(this.state.status)
                        break
                    }     
                }
                else{
                    //console.log("Email Inexistente, caso esteja correto se cadastre na plataforma")
                    //Status = 0
                    
                }
                //console.log(Status)
                this.setState({
                    status :  "Email Inexistente, caso esteja correto se cadastre na plataforma"
                })            
             };
            /*if (this.state.status === 0){
                this.setState({
                    txt: "Email n cadastrado"
                });
            }else if (this.state.status === 1){
                this.setState({
                    txt: "Email Cadastrado"
                });
            }else if (this.state.status === 2){
                this.setState({
                    txt: "Email e Senha corretos"
                });
            } else {
                this.setState({
                    txt: "Senha Incorreta!"
                });
                console.log(this.state.status)
            }*/
        })
    }

    render(){
        return(
            <div className="container">
                <div className="box">
                    <div className="side-image">
                        <img src={logo} alt="" className="logo-image"/>
                    </div>
                    <form onSubmit={this.onSubmit} className="login-form">
                        <h3 className="title">Sign In</h3>
                        <div className="form-txt">
                            <p>{this.state.status}</p>
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
                        
                        <Link to="/cadastro" className="signup-button">Cadastre-se</Link>
                    </form>
                </div>
            </div>
        )
    }
}