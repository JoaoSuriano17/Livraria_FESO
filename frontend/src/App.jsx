import { Routes, Route, Link, useNavigate } from "react-router";
import Cadastro from './Cadastro'
import CadastroAutor from './CadastroAutor'
import Login from './Login'
import Home from './Home'
import Usuario from './Usuario'
import { User } from "lucide-react";
import CadastroEditora from "./CadastroEditora";
import LoginEditora from "./LoginEditora";
import Editora from "./Editora";

function App() {

  let a = <Link to={"/cadastro"}>Crie uma</Link>
  let b = <Link to={"/login"}>Faça login</Link>
  let c = <Link to={"/login"}><User /></Link>
  let d = <Link to={"/cadastro"}>Crie uma</Link>
  let e = <Link to={"/cadastroAutor"}>Autores</Link>
  let f = <Link to={"/loginEditora"}>Editoras</Link>
  let g = <Link to={"/loginEditora"}>Faça login</Link>
  let h = <Link to={"/cadastroEditora"}>Crie uma</Link>

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

      return true

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

      if (!r2.ok) {
        console.log("Erro:", r3);
        return false;
      }

      console.log("Senha alterada:", r3);
      localStorage.setItem("usuario", JSON.stringify(r3));

      return true

    }catch(error){
      console.log("Erro ao conectar com o servidor: "+error)
    }
  }

  async function alterarImg(senha, img, id){
    try{
      const r = await fetch(`http://localhost:3000/usuarios/${id}`)
      const j=await r.json()

      if (j.usuario.senha!=senha){
        return console.log("Senha incorreta")
      }
      
      const r2 = await fetch(`http://localhost:3000/usuarios/${id}/img`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha:senha,
          img:img
        }),
      });
      
      const r3 = await r2.json();

      if (!r2.ok) {
        console.log("Erro:", r3);
        return false;
      }

      console.log("Imagem alterada:", r3);
      localStorage.setItem("usuario", JSON.stringify(r3));

      return true

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

      navigate("/usuario", {
        state: {
          "id":data.usuario.id,
          "nome":data.usuario.nome,
          "login":data.usuario.login,  
          "senha":data.usuario.senha,
          "img":data.usuario.img, 
          "nacionalidade":data.usuario.nacionalidade
        }
      });

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }


  async function deletarUsuario(senha, id){
    try{
      const r = await fetch(`http://localhost:3000/usuarios/${id}`)
      const j=await r.json()

      if (j.usuario.senha!=senha){
        return console.log("Senha incorreta")
      }
      
      const r2 = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha:senha,
        }),
      });
      
      const r3 = await r2.json();

      if (!r2.ok) {
        console.log("Erro:", r2);
        return false;
      }

      console.log("Usuário deletado com sucesso", r3);
      localStorage.setItem("usuario", JSON.stringify(r3));

      return true

    }catch(error){
      console.log("Erro ao conectar com o servidor: "+error)
    }
  }

  async function cadastrarAutor(nome, login, senha, img, nacionalidade, biografia, dataNascimento) {
    try {
      const r = await fetch("http://localhost:3000/autores", {
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


      navigate("/usuario", {
        state: {
          "id":data.autor.id,
          "nome":data.autor.nome,
          "login":data.autor.login,  
          "senha":data.autor.senha,
          "img":data.autor.img, 
          "nacionalidade":data.autor.nacionalidade,
          "biografia":data.autor.biografia,
          "data_nascimento":data.autor.data_nascimento
        }
      });

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }

  async function verificarAutor(id){
    try{
      const r = await fetch(`http://localhost:3000/autores/${id}`)

      const r2=await r.json()

      if (!r.ok){
        console.log("Erro: "+r2)
        return false
      }

      return r2.autor
    }catch(erro){
      console.log("Erro: "+erro)
      return false
    }
  }

  async function alterarBiografia(senha, id, login, biografia){
    try{
      const r = await fetch(`http://localhost:3000/autores/${id}/biografia`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha:senha,
          login:login,
          biografia:biografia
        })
      })

      const r2=await r.json()
      
      if (!r.ok){
        console.log("Erro: "+r2.msg)
        return false
      }

      console.log("Biografia alterada com sucesso")

      return true;

    }catch(erro){
      console.log("Bixou aqui ó: "+erro)
    }
  }



  async function cadastrarEditora(nome, cnpj, senha, telefone, email, site){
    try {
      const r = await fetch("http://localhost:3000/editoras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cnpj,
          senha,
          telefone,
          email,
          site,
        })
      });

      const data = await r.json();

      if (!r.ok) {
        console.error("Erro:", data.msg);
        return false;
      }

      console.log(data.msg);
      console.log("Editora criada:", data.editora);

      navigate("/editora",{
        state:{
          "nome": data.editora.nome,
          "cnpj":data.editora.cnpj,
          "email":data.editora.email,
          "id":data.editora.id,
          "site":  data.editora.site,
          "telefone": data.editora.telefone,
          "sehna":data.editora.senha
        }
      })

      return true;

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }


  async function loginEditora(cnpj, senha) {
    try {
      const r = await fetch("http://localhost:3000/editoras/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cnpj,
          senha
        }),
      });

      const r2 = await r.json();

      if (!r.ok) {
        console.log("Erro:", r2);
        return false;
      }

      console.log("Editora logada:", r2);

      // Guarda o usuário
      localStorage.setItem("editora", JSON.stringify(r2));

      navigate("/editora",{
        state:{
          "nome": r2.editora.nome,
          "cnpj":r2.editora.cnpj,
          "email":r2.editora.email,
          "id":r2.editora.id,
          "site":  r2.editora.site,
          "telefone": r2.editora.telefone,
          "sehna":r2.editora.senha
        }
      })

      return true

    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      return false;
    }
  }

  async function alterarTelefone(id, cnpj, senha, telefone){
    try{
      const t=await fetch(`http://localhost:3000/editoras/${id}/`)
      const t2=await t.json()

      if (t2.editora.senha!=senha){
        console.log("Senha incorreta")
        return false
      }else if (t2.editora.cnpj!=cnpj){
        console.log("CNPJ incorreto")
        return false
      }

      const r = await fetch(`http://localhost:3000/editoras/${id}/telefone`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha,
          cnpj,
          telefone
        })
      })

      const r2=await r.json()
      
      if (!r.ok){
        console.log("Erro: "+r2.msg)
        return false
      }

      console.log(r2.msg)

      return true;

    }catch(erro){
      console.log("Bixou aqui ó: "+erro)
    }
  }

  async function alterarSite(id, cnpj, senha, site){
    try{
      const t=await fetch(`http://localhost:3000/editoras/${id}/`)
      const t2=await t.json()

      if (t2.editora.senha!=senha){
        console.log("Senha incorreta")
        return false
      }else if (t2.editora.cnpj!=cnpj){
        console.log("CNPJ incorreto")
        return false
      }

      const r = await fetch(`http://localhost:3000/editoras/${id}/site`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha,
          cnpj,
          site
        })
      })

      const r2=await r.json()
      
      if (!r.ok){
        console.log("Erro: "+r2.msg)
        return false
      }

      console.log(r2.msg)

      return true;

    }catch(erro){
      console.log("Bixou aqui ó: "+erro)
    }
  }

  async function deletarEditora(id, cnpj, senha){
    try{
      const r = await fetch(`http://localhost:3000/editoras/${id}`)
      const j=await r.json()

      if (j.editora.senha!=senha){
        return console.log("Senha incorreta")
      }else if (j.editora.cnpj!=cnpj){
        return console.log("CNPJ incorreta")
      }
      
      const r2 = await fetch(`http://localhost:3000/editoras/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha,
          cnpj
        }),
      });
      
      const r3 = await r2.json();

      if (!r2.ok) {
        console.log("Erro:", r2);
        return false;
      }

      console.log("Editora deletada com sucesso", r3);
      localStorage.setItem("editora", JSON.stringify(r3));

      return true

    }catch(error){
      console.log("Erro ao conectar com o servidor: "+error)
    }
  }

  return (
    <>
      <Routes>
        <Route element={<Cadastro encaminhar={b} cadastrar={cadastrar}></Cadastro>} path="/cadastro"></Route>
        <Route element={<Login encaminhar={a} login={loginUsuario}></Login>} path="/login"></Route>
        <Route element={<CadastroAutor encaminhar={d} cadastrar={cadastrarAutor}></CadastroAutor>} path="/cadastroAutor"></Route>
        <Route element={<Usuario login={loginUsuario} senha={alterarSenha} img={alterarImg} delete={deletarUsuario} autor={verificarAutor} biografia={alterarBiografia}></Usuario>} path="/usuario"></Route>
        <Route element={<CadastroEditora encaminhar={g} cadastrar={cadastrarEditora}></CadastroEditora>} path="/cadastroEditora"></Route>
        <Route element={<LoginEditora encaminhar={h} login={loginEditora}></LoginEditora>} path={"/loginEditora"}></Route>
        <Route element={<Editora telefone={alterarTelefone} site={alterarSite} deletar={deletarEditora}></Editora>} path={"/editora"}></Route>

        <Route path="*" element={<Home encaminhar={c} encaminhar2={e} encaminhar3={f}></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
