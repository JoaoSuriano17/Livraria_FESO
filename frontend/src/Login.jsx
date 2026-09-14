import { useState } from "react";
import "./cadastro.css";

function Login(props) {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await props.login(login, senha);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full rounded-md flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto centro flex"/>

                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Faça login na sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Email
                            </label>

                            <div className="mt-2">
                                <input id="login" type="login" name="login" value={login} onChange={(e) => setLogin(e.target.value)} required autoComplete="login" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                    Senha
                                </label>
                            </div>

                            <div className="mt-2">
                                <input id="password" type="password" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="flex-col sm:flex-row sm:flex sm:gap-3 sm:justify-between items-center">
                            <div className="flex items-center gap-2">
                                <input id="remember" type="checkbox" name="remember" className="h-4 w-4"/>

                                <div className="text-sm">
                                    <label htmlFor="remember" className="font-medium text-white">
                                        Lembre-se de mim
                                    </label>
                                </div>
                            </div>

                            <div className="text-sm mt-3">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                Entrar
                            </button>
                        </div>

                        <div className="flex flex-col text-gray-100 gap-3">
                            <div className="divider">
                                <span className="line"></span>
                                <span className="text-sm/6 font-medium">
                                    Or continue com
                                </span>
                                <span className="line"></span>
                            </div>

                            <div className="flex flex-col gap-3.5">
                                <button type="button" className="flex items-center justify-center gap-1.5 font-medium text-sm px-5 py-2 bg-gray-800 cursor-pointer rounded-lg hover:bg-gray-700">
                                    Continue com Google
                                </button>

                                <button type="button" className="flex items-center justify-center gap-1.5 font-medium text-sm px-5 py-2 bg-gray-800 cursor-pointer rounded-lg hover:bg-gray-700">
                                    Continue com Facebook
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                            Não possui uma conta?
                            {props.encaminhar}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
