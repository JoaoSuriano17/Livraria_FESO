import "./cadastro.css"

function Login(props){

    return(
        <>
            <div className="flex min-h-full rounded-md flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"
                        className="mx-auto h-10 w-auto centro flex" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Faça login na sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email</label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" required autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Senha</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" required autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="flex-col sm:flex-row sm:flex sm:gap-3 sm:justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input id="remember" type="checkbox" name="remember"
                                            aria-describedby="remember-password"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto" />
                                        <svg viewBox="0 0 14 14" fill="none"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                                            <path d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <label htmlFor="remember" className="font-medium text-white">Lembre-se de mim</label>
                                </div>
                            </div>
                            <div className="text-sm mt-3">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Esqueceu a
                                    senha?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Entrar</button>
                        </div>

                        <div className="flex flex-col text-gray-100 gap-3">
                            <div className="divider">
                                <span className="line"></span>
                                <span className="text-sm/6 font-medium">Or continue com</span>
                                <span className="line"></span>
                            </div>

                            <div className="flex flex-col gap-3.5">
                                <button
                                    className="flex items-center justify-center gap-1.5 font-medium text-sm px-5 py-2 bg-gray-800 cursor-pointer rounded-lg hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"
                                        viewBox="0 0 48 48">
                                        <path fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                                        </path>
                                        <path fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                                        </path>
                                        <path fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                                        </path>
                                        <path fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                                        </path>
                                    </svg>
                                    Continue com Google
                                </button>
                                <button
                                    className="flex items-center justify-center gap-1.5 font-medium text-sm px-5 py-2 bg-gray-800 cursor-pointer rounded-lg hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                                        viewBox="0 0 48 48">
                                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                        <path fill="#fff"
                                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z">
                                        </path>
                                    </svg>
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
    )
}

export default Login