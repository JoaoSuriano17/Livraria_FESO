import { Routes, Route, Link, useNavigate } from "react-router";
import Cadastro from './Cadastro'
import CadastroAutor from './CadastroAutor'
import Login from './Login'
import Home from './Home'
import Usuario from './Usuario'
import { User } from "lucide-react";
import { useEffect } from "react";

function App() {

  let a = <Link to={"/cadastro"}>Crie uma</Link>
  let b = <Link to={"/login"}>Faça login</Link>
  let c = <Link to={"/login"}><User /></Link>
  let d = <Link to={"/cadastro"}>Crie uma</Link>

  const navigate = useNavigate();

  async function loginUsuario(login, senha) {
    try {
      const r = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          senha: senha,
        }),
      });

      const r2 = await r.json();

      if (!r.ok) {
        console.log("Erro:", r2);
        return false;
      }

      console.log("Usuário logado:", r2);

      // Guarda o usuário
      localStorage.setItem("usuario", JSON.stringify(r2));

      navigate("/usuario", {
        state: {
          "id":r2.usuario.id,
          "nome":r2.usuario.nome,
          "login":r2.usuario.login,  
          "senha":r2.usuario.senha,
          "img":r2.usuario.img, 
          "nacionalidade":r2.usuario.nacionalidade
        }
      });

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }


  async function alterarSenha(senha_atual, senha_nova, id){
    try{
      const r = await fetch(`http://localhost:3000/usuarios/${id}`)
      const j=await r.json()

      if (j.usuario.senha!=senha_atual){
        return console.log("Senha incorreta")
      }
      
      const r2 = await fetch(`http://localhost:3000/usuarios/${id}/senha`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha_antiga:senha_atual,
          senha_nova:senha_nova
        }),
      });
      
      const r3 = await r2.json();

      if (!r3.ok) {
        console.log("Erro:", r3);
        return false;
      }

      console.log("Senha alterada:", r3);
      localStorage.setItem("usuario", JSON.stringify(r3));

    }catch(error){
      console.log("Erro ao conectar com o servidor: "+error)
    }
  }

  async function cadastrar(nome, login, senha, img, nacionalidade) {
    try {
      const r = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          login,
          senha,
          img,
          nacionalidade
        })
      });

      const data = await r.json();

      if (!r.ok) {
        console.error("Erro:", data.msg);
        return false;
      }

      console.log(data.msg);
      console.log("Usuário:", data.usuario);

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }

  async function cadastrarAutor(nome, login, senha, img, nacionalidade, biografia, dataNascimento) {
    try {
      const r = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          login,
          senha,
          img,
          nacionalidade,
          biografia,
          data_nascimento: dataNascimento
        })
      });

      const data = await r.json();

      if (!r.ok) {
        console.error("Erro:", data.msg);
        return false;
      }

      console.log(data.msg);
      console.log("Autor criado:", data.autor);

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }


  async function loginUsuarioAutor() {

  }

  async function loginEditora() {

  }

  return (
    <>
      <Routes>
        <Route element={<Cadastro encaminhar={b} cadastrar={cadastrar}></Cadastro>} path="/cadastro"></Route>
        <Route element={<Login encaminhar={a} login={loginUsuario}></Login>} path="/login"></Route>
        <Route element={<CadastroAutor encaminhar={d} cadastrar={cadastrarAutor}></CadastroAutor>} path="/cadastroAutor"></Route>
        <Route element={<Usuario login={loginUsuario} senha={alterarSenha}></Usuario>} path="/usuario"></Route>

        <Route path="*" element={<Home encaminhar={c}></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
