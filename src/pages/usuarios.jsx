import React, { Component } from 'react';

import axios from 'axios';

export default class Usuarios extends Component{

    constructor(props){
        super(props);
        this.state = {lista:[
            {username: "Antonio"},
            {username: "Joao"}
        ]}
        
        axios.get("http://localhost:3003/usuarios")
            .then(resp => {
                if(Math.floor(resp.status/100) === 2){
                    this.setState({lista: resp})
                    return;
                }
                console.log(resp)
            })
            .catch(error => console.log(error))
    }

    render(){
        var usuarios = this.state.lista

        var listaUsuarios = usuarios.map(usuario => {
            return(
                <li key={usuario.username}>{usuario.username}</li>
            )
        })

        return(
            <div>
                <ul>{listaUsuarios}</ul>
            </div>
        )
    }
}