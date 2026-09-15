import { useLocation, useNavigate } from "react-router";
import "./Usuario.css"
import { useState } from "react";
import { useEffect } from "react";

function Usuario(props){
     const location = useLocation();
     const [senha_atual, setSenha_atual]=useState("")
     const [senha_nova, setSenha_nova]=useState("")

     const [senha, setSenha]=useState("")
     const [img, setImg]=useState("")

     const [senha2, setSenha2]=useState("")

     const [senha3, setSenha3]=useState("")
     const [login, setLogin]=useState("")
     const [biografia, setBiografia]=useState("")

     const navigate=useNavigate()


     async function alterarSenha(e){
        e.preventDefault()
        const r=await props.senha(senha_atual, senha_nova, location.state.id)
        console.log(r)
     }

     async function alterarImg(e){
        e.preventDefault()
        const r=await props.img(senha, img, location.state.id)
        console.log(r)

        if(r==true){
            navigate("/usuario", {
                state:{
                    "id":location.state.id,
                    "nome":location.state.nome,
                    "login":location.state.login,
                    "senha":location.state.senha,
                    "img":img,
                    "nacionalidade":location.state.nacionalidade
                }
            })
        }
     }

     async function deletar(e){
        e.preventDefault()
        const r=await props.delete(senha2, location.state.id)
        console.log(r)

        if(r==true){
            navigate("/cadastro")
        }
     }

     async function alterarBiografia(e){
        e.preventDefault()
        const r=await props.biografia(senha3, location.state.id, login, biografia)
        console.log(r)

        if(r==true){
            navigate("/cadastro")
        }
     }




     const [autor, setAutor]=useState(false)
     useEffect(() => {
        async function verificarAutor() {
            const r = await props.autor(location.state.id);

            console.log("Autor:", r);

            if (r != false) {
                setAutor(true);
            }
        }

        verificarAutor();
    }, [location.state.id]);
        

    return(
        <>
            <img src={location.state.img} className="imagemUsuario" />
            <p>Olá {location.state.nome} {autor && "grande autor"}</p>
            {autor && <><h2>Alterar biografia</h2>
            <form onSubmit={alterarBiografia}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha3} onChange={(e) => setSenha3(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="login" type="text" name="login" value={login} placeholder="Login" onChange={(e) => setLogin(e.target.value)} required autoComplete="login"/><br></br><br></br>
                <textarea id="biografia" type="text" name="biografia" value={biografia} placeholder="Biografia" onChange={(e) => setBiografia(e.target.value)} required autoComplete="biografia"/><br></br><br></br>
                <button>Enviar</button>
            </form></>}

            <hr></hr>
            <h2>Alterar senha</h2>
            <form onSubmit={alterarSenha}>
                <input id="senha_atual" type="text" name="senha_atual" placeholder="Senha atual" value={senha_atual} onChange={(e) => setSenha_atual(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="senha_nova" type="text" name="senha_nova" value={senha_nova} placeholder="Senha antiga" onChange={(e) => setSenha_nova(e.target.value)} required autoComplete="new_password"/><br></br><br></br>
                <button>Enviar</button>
            </form>

            <hr></hr>
            <h2>Alterar imagem</h2>
            <form onSubmit={alterarImg}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <input id="img" type="url" name="img" value={img} placeholder="URL da nova imagem" onChange={(e) => setImg(e.target.value)} required autoComplete="img"/><br></br><br></br>
                <button>Enviar</button>
            </form>

            <hr></hr>
            <h2>Desativar usuário</h2>
            <form onSubmit={deletar}>
                <input id="senha" type="text" name="senha" placeholder="Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required autoComplete="password"/><br></br><br></br>
                <button>Enviar</button>
            </form>
        </>
    )
}

export default Usuario