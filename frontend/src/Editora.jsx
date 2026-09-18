import { useState } from "react"
import {useLocation, useNavigate} from "react-router-dom"

function Editora(props){

    const location=useLocation()
    const navigate=useNavigate()

    const [telefone, setTelefone]=useState("")
    const [senha, setSenha]=useState("")
    const [cnpj, setCnpj]=useState("")

    const [site, setSite]=useState("")
    const [senha2, setSenha2]=useState("")
    const [cnpj2, setCnpj2]=useState("")

    const [senha3, setSenha3]=useState("")
    const [cnpj3, setCnpj3]=useState("")

    async function alterarTelefone(e){
        e.preventDefault()
        const r=await props.telefone(location.state.id, cnpj, senha, telefone)
        console.log(r)

        if(r==true){
            navigate("/editora", {
                state:{
                    "id":location.state.id,
                    "nome":location.state.nome,
                    "cnpj":location.state.cnpj,
                    "email":location.state.email,
                    "senha":location.state.senha,
                    "telefone":telefone,
                    "site":location.state.site
                }
            })
        }
    }

    async function alterarSite(e){
        e.preventDefault()
        const r=await props.site(location.state.id, cnpj2, senha2, site)
        console.log(r)

        if(r==true){
            navigate("/editora", {
                state:{
                    "id":location.state.id,
                    "nome":location.state.nome,
                    "cnpj":location.state.cnpj,
                    "email":location.state.email,
                    "senha":location.state.senha,
                    "telefone":location.state.telefone,
                    "site":site
                }
            })
        }
    }

    async function deletar(e){
        e.preventDefault()
        const r=await props.deletar(location.state.id, cnpj3, senha3)
        console.log(r)

        if (r==true){
            navigate("/cadastroEditora")
        }
    }


    return(
        <>
            <p>Olá {location.state.nome}, tudo bem?</p>
            <p>Seu Telefone: {location.state.telefone}</p>
            <p>Seu Site: {location.state.site}</p>

            <hr></hr>
            <h2>Alterar telefone</h2>
            <form onSubmit={alterarTelefone}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="cnpj" type="text" name="cnpj" value={cnpj} placeholder="CNPJ" onChange={(e) => setCnpj(e.target.value)} required autoComplete="cnpj"/><br></br><br></br>
                <input id="telefone" type="text" name="telefone" value={telefone} placeholder="Novo telefone" onChange={(e) => setTelefone(e.target.value)} required autoComplete="telefone"/><br></br><br></br>
                <button>Enviar</button>
            </form>

            <hr></hr>
            <h2>Alterar Site</h2>
            <form onSubmit={alterarSite}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="cnpj" type="text" name="cnpj" value={cnpj2} placeholder="CNPJ" onChange={(e) => setCnpj2(e.target.value)} required autoComplete="cnpj"/><br></br><br></br>
                <input id="site" type="url" name="site" value={site} placeholder="Novo site" onChange={(e) => setSite(e.target.value)} required autoComplete="site"/><br></br><br></br>
                <button>Enviar</button>
            </form>

            <hr></hr>
            <h2>Deletar editora</h2>
            <form onSubmit={deletar}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha3} onChange={(e) => setSenha3(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="cnpj" type="text" name="cnpj" value={cnpj3} placeholder="CNPJ" onChange={(e) => setCnpj3(e.target.value)} required autoComplete="cnpj"/><br></br><br></br>                <button>Enviar</button>
            </form>
        </>
    )
}

export default Editora