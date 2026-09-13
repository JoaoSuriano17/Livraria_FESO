import { useState } from "react";
import "./cadastro.css";

function CadastroAutor(props) {
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [img, setImg] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [biografia, setBiografia] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const sucesso = await props.cadastrar( nome, login, senha, img, nacionalidade, biografia, dataNascimento );

            if (sucesso) {
                console.log("Cadastro realizado!");
            }

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full rounded-md flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto flex centro"/>

                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Crie sua conta de autor
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="login" className="block text-sm/6 font-medium text-gray-100">
                                Login
                            </label>

                            <div className="mt-2">
                                <input id="login" type="text" name="login" value={login} onChange={(e) => setLogin(e.target.value)} required autoComplete="username" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nome" className="block text-sm/6 font-medium text-gray-100">
                                Nome
                            </label>

                            <div className="mt-2">
                                <input id="nome" type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required autoComplete="name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="senha" className="block text-sm/6 font-medium text-gray-100">
                                    Senha
                                </label>
                            </div>

                            <div className="mt-2">
                                <input id="senha" type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="new-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="img" className="block text-sm/6 font-medium text-gray-100" >
                                Imagem
                            </label>

                            <div className="mt-2">
                                <input id="img" type="text" name="img" value={img} onChange={(e) => setImg(e.target.value)} placeholder="URL da imagem" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nacionalidade" className="block text-sm/6 font-medium text-gray-100">
                                Nacionalidade
                            </label>

                            <div className="mt-2">
                                <input id="nacionalidade" type="text" name="nacionalidade" value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)} required autoComplete="country-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="biografia" className="block text-sm/6 font-medium text-gray-100">
                                Biografia
                            </label>

                            <div className="mt-2">
                                <textarea id="biografia" name="biografia" value={biografia} onChange={(e) => setBiografia(e.target.value)} required rows="4" placeholder="Conte um pouco sobre você..." className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 resize-none" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="dataNascimento" className="block text-sm/6 font-medium text-gray-100">
                                Data de nascimento
                            </label>

                            <div className="mt-2">
                                <input id="dataNascimento" type="date" name="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                Criar conta
                            </button>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                            Já possui uma conta?
                            {props.encaminhar}
                        </p>

                    </form>
                </div>
            </div>
        </>
    );
}

export default CadastroAutor;
