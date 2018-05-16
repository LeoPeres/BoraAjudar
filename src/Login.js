import React from 'react'
import {auth} from './base'
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)

        this.email = null
        this.passwd = null

        this.state = {
            isLoggedIn: false,
            error: false,
            isLogging: false
        }

        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(){
        this.setState({
            isLogging: true,
            error: false
        })
        auth
            .signInWithEmailAndPassword(this.email.value, this.passwd.value)
            .then((user)=>{
                this.setState({
                    isLoggedIn: true
                })
            })
            .catch(error=>{
                this.setState({
                    error:true,
                    isLogging:false
                })
            })
    }

    render(){
        if(this.state.isLoggedIn){
            return <Redirect to='/admin' />
        }
        return(
            <div>
                <input type='email' ref={ref=> this.email = ref} />
                <input type='passwd' ref={ref=> this.passwd = ref} />
                {this.state.error && <p>Email e/ou senha invalidos</p>}
                <button disabled={this.state.isLogging} onClick={this.handleLogin}>Entrar</button>
            </div>
        )
    }
}

export default Login