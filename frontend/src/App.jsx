import { Routes, Route, Link } from "react-router";
import Cadastro from './Cadastro'
import Login from './Login'
import Home from './Home'
import { User } from "lucide-react";

function App() {

  let a = <Link to={"/cadastro"}>Crie uma</Link>
  let b = <Link to={"/login"}>Faça login</Link>
  let c = <Link to={"/login"}><User /></Link>

  return(
    <>
      <Routes>
        <Route element={<Cadastro encaminhar={b}></Cadastro>} path="/cadastro"></Route>
        <Route element={<Login encaminhar={a}></Login>} path="/login"></Route>
        <Route path="*" element={<Home encaminhar={c}></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
