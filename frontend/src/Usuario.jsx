import { useLocation, useNavigate } from "react-router";
import "./Usuario.css"
import { useState } from "react";

function Usuario(props){
     const location = useLocation();
     const [senha_atual, setSenha_atual]=useState("")
     const [senha_nova, setSenha_nova]=useState("")

     const navigate=useNavigate()
     console.log(location.state.id)

     async function alterarSenha(e){
        e.preventDefault()
        const r=await props.senha(senha_atual, senha_nova, location.state.id)
        console.log(r)
     }

    return(
        <>
            <img src={location.state.img} className="imagemUsuario" />
            <p>Olá {location.state.nome}</p>

            <hr></hr>
            <h2>Alterar senha</h2>
            <form onSubmit={alterarSenha}>
                <input id="senha_atual" type="text" name="senha_atual" placeholder="Senha atual" value={senha_atual} onChange={(e) => setSenha_atual(e.target.value)} required autoComplete="username"/><br></br><br></br>
                <input id="senha_nova" type="text" name="senha_nova" value={senha_nova} placeholder="Senha antiga" onChange={(e) => setSenha_nova(e.target.value)} required autoComplete="username"/><br></br><br></br>
                <button>Enviar</button>
            </form>
        </>
    )
}

export default Usuario