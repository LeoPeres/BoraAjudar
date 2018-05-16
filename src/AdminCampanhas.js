import React from 'react'

import base from './base'

class AdminCampanhas extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            campanhas: {}
        }

        this.renderCampanha = this.renderCampanha.bind(this)
        this.removeCampanha = this.removeCampanha.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount(){
        base.syncState('campanhas',{
            context:this,
            state: 'campanhas',
            asArray: false
        })
    }

    handleSave(){
        const nome = this.refs.nome.value
        const desc = this.refs.desc.value
        const tipo = this.state.tipo
        const comoDoar = this.state.tipo == 'produtos' ? this.refs.comoDoar.value : null
        const meta = this.state.tipo == 'doacao' ? this.refs.meta.value : null
        const doado = this.state.tipo == 'doacao' ? this.refs.doado.value : null
        
        base.push('campanhas', {
            data:{nome, desc, tipo, comoDoar, meta, doado},
            then: err =>{
                if(!err){
                    this.refs.nome.value = ''
                    this.refs.subTitulo.value = ''
                    this.refs.desc.value = ''
                    this.setState({tipo: null})
                    if(this.ref.meta){
                        this.ref.meta.value = ''
                    }
                    if(this.ref.doado){
                        this.ref.doado.value = ''
                    }
                    if(this.ref.comoDoar){
                        this.ref.comoDoar.value = ''
                    }
                }
            }
        })
    }

    removeCampanha(key){
        base.remove('campanhas/'+key, err =>{
            console.log(err)
        })
    }

    renderCampanha(key, campanha){
        return (
            <li key={key}>
                {campanha.nome}
                <button onClick={() => 1}>Editar</button>
                <button onClick={() => this.removeCampanha(key)}>Remover</button>
            </li>
        )
    }

    render(){
        return(
            <div>
                <h1>Campanhas</h1>
                <h2>Nova Campanha</h2>
                Campanha  <input type='text' ref='nome' />
                <br/>
                Subtitulo <textarea ref='subTitulo'></textarea>
                <br/>
                Descricao <textarea ref='desc'></textarea>
                <br/>
                Tipo <br/>
                    <input type='radio' name='tipo' onClick={()=> this.setState({tipo:'doacao'})} /> Doação <br/>
                    <input type='radio' name='tipo' onClick={()=> this.setState({tipo:'produtos'})}/> Produtos
                <br/>
                {this.state.tipo == 'doacao' &&<div>
                    <h4>Doação</h4>
                    Meta <input type='text' ref='meta' />
                    Doado <input type='text' ref='doado' defaultValue='0' />
                </div>}
                {this.state.tipo == 'produtos' &&<div>
                    <h4>Produtos</h4>
                    Como doar <input type='text' ref='comoDoar' />
                </div>}
                <button onClick={this.handleSave}>Salvar campanha</button>
                <ul>
                    {Object.keys(this.state.campanhas).map(key => this.renderCampanha(key, this.state.campanhas[key]))}
                </ul>
            </div>
        )
    }
}

export default AdminCampanhas