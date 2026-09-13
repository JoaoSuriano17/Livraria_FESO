import { Routes, Route, Link } from "react-router";
import Cadastro from './Cadastro'
import CadastroAutor from './CadastroAutor'
import Login from './Login'
import Home from './Home'
import { User } from "lucide-react";

function App() {

  let a = <Link to={"/cadastro"}>Crie uma</Link>
  let b = <Link to={"/login"}>Faça login</Link>
  let c = <Link to={"/login"}><User /></Link>
  let d = <Link to={"/cadastro"}>Crie uma</Link>

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

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
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

        <Route path="*" element={<Home encaminhar={c}></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
