import React from 'react'
import {auth} from './base'
import {Redirect, Route} from 'react-router-dom'
import AdminCampanhas from './AdminCampanhas'

const AdminHome = props => <p>Seja bem vindo</p>

class Admin extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isAuthing: true,
            isLoggendIn: false,
            user: null
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            this.setState({
                isAuthing: false,
                isLoggendIn: !!user,
                user: user
            })
        })
    }

    render(){
        if(this.state.isAuthing){
            return <p>Aguarde</p>   
        }
        if(!this.state.isLoggendIn){
            return <Redirect to='/login' />
        }
        return(
            <div className='card'>
               <h1>Painel administrativo</h1>
               <Route exact path='/' component={AdminHome} />
               <Route path={this.props.match.url+'/campanhas'} component={AdminCampanhas} />
            </div>
        )
    }
    
}

export default Admin