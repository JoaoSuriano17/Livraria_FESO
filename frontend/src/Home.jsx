import { useState } from 'react'
import './App.css'
import { Search, Heart, ShoppingCart, User, Menu, Star, BookOpenCheck, Quote, ChevronsRight } from "lucide-react";
import { useRef } from 'react';
import { SocialIcon } from 'react-social-icons'

function Home(props) {

  const inputSearch = useRef(null)
  const links = useRef(null)
  const imgNavbar = useRef(null)
  const iconsConta = useRef(null)

  return (
    <>
      <header>
        <div className='topo'>
          <nav className="navbar grid grid-cols-2 md:grid-cols-3 items-center">
            <div className="nav-logo" ref={imgNavbar}>
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" className="fa-brands fa-tailwind-css fa-2xl" style={{ color: "oklch(67.3% .182 276.935)" }}/>
            </div>

            <div className="nav-links font-medium flex gap-8 list-none justify-center" ref={links}>
              <li><a href="#">Início</a></li>
              <li><a href="#">Gêneros</a></li>
              <li>{props.encaminhar2}</li>
              <li><a href="#">Resenhas</a></li>
              <li><a href="#">Minha Estante</a></li>
            </div>

            <div className="nav-conta flex gap-6 list-none justify-end items-center">
              <div className="search-wrapper">
                <input
                  type="text"
                  className="rounded-full mr-2 search"
                  placeholder="Buscar livros..."
                  ref={inputSearch}
                />
                <button className="search-toggle" aria-label="Abrir busca" onClick={()=>{inputSearch.current.classList.toggle('open'); if (inputSearch.current.classList.contains('open')) { inputSearch.current.focus(); imgNavbar.current.classList.add('opacity-0'); iconsConta.current.classList.add('hidden-icons-conta') }}}>
                  <Search />
                </button>
              </div>

              <div className="div-account flex gap-6" ref={iconsConta}>
                <li><a href="#"><Heart/></a></li>
                <li><a href="#"><ShoppingCart /></a></li>
                <li>{props.encaminhar}</li>
                <li><a href="#"><Menu /></a></li>
              </div>

              <button
                className="navbar-toggle"
                aria-label="Abrir menu"
                aria-expanded="false"
                onClick={()=>{const isOpen = links.current.classList.toggle('open'); toggle.setAttribute('aria-expanded', isOpen);}}
              >
                <Menu />
              </button>
            </div>
          </nav>

          <section className="hero overflow-hidden w-full m-auto py-32 sm:py-48 lg:py-56">

            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              ></div>
            </div>

            <div className="text-center m-auto max-w-3xl">
              <p className="mb-6 ring-1 ring-gray-500 hover:ring-gray-400 text-gray-400 py-1.5 text-xs sm:text-sm w-68 rounded-full m-auto">
                Mais de 12.000 títulos disponíveis
              </p>

              <h1 className="text-5xl text-balance font-semibold sm:text-6xl">
                Descubra sua próxima leitura
              </h1>

              <h3 className="text-base/6 p-3 sm:p-0 text-gray-400 font-medium my-9 sm:text-xl/8">
                Encontre mais do que simples obras: encontre
                perspectivas, inspirações, emoções e desperte sua imaginação. Explore
                nosso catálogo feito para quem ama ser leitor
              </h3>

              <div className="flex gap-6 justify-center mt-5">
                <button className="rounded-md bg-indigo-500 font-semibold px-3 py-2 transition-all hover:bg-indigo-400 hover:-translate-y-1">
                  <a href="#">Explorar Catálogo</a>
                </button>

                <button className="rounded-md bg-gray-500 font-semibold px-3 py-2 transition-all hover:bg-gray-300 hover:-translate-y-1">
                  <a href="#">Ver Resenhas</a>
                </button>
              </div>
            </div>
          </section>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          ></div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl lg:max-w-7xl p-10 lg:p-8 my-8">

        <div id="livros-populares" className="sessao-livros w-full">
          <h2>Populares</h2>
          <p>O que todos estão lendo</p>

          <div className="sessao-lista-livros">

            {[1, 2, 3, 4].map((item) => (
              <div className="card-livro">
                <div className="div-img-livro">
                    <img src="https://imgs.search.brave.com/G6Vq6U2WXyPwi4tzNKymHOu6z-pvFrEPFiCYwUakgV0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9kZXNlbmhvLWRl/LW1hcXVldGUtZGUt/Y2FwYS1kZS1saXZy/by0zZC1pbWFnZW0t/Y29sb3JpZGEtcmVh/bGlzdGFfMTI3MjYy/NS0zOTM2LmpwZz9z/ZW10PWFpc19oeWJy/aWQ" alt="Livros populares" className="rounded-md"/>

                    <button className="heart-favoritar">
                        <Heart className="icon-favoritar" fill={"white"} stroke={"black"} onClick={(e)=>{if (e.target.getAttribute("stroke")=="black"){e.target.setAttribute("stroke", "red")} else{e.target.setAttribute("stroke", "black")}}}/>
                    </button>

                    <div className="btns-carrinho-detalhe">
                        <button className="btn-carrinho">
                            Adicionar ao carrinho
                            <ShoppingCart size={20} />
                        </button>
                        <button className="btn-detalhes">Ver detalhes</button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg mt-2.5 font-bold">Titulo do livro</h3>

                    <p className="text-base text-gray-300 font-medium">Autor</p>

                    <div className="flex items-center gap-2">
                        <div className="flex"> {[1,2,3,4,5].map((item)=>(<Star size={20} fill='black' onClick={(e)=>{if (e.target.getAttribute("fill")=="black"){e.target.setAttribute("fill", "yellow")} else{e.target.setAttribute("fill", "black")}}} />))} </div>
                        <p className="text-sm">Nota</p>
                        <p className="text-sm">Qtde</p>
                    </div>

                    <h3 className="text-xl font-bold mt-3">Preço</h3>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div id="livros-fantasia" className="sessao-livro">
          <h2>Fantasia</h2>
          <p>Mundos imaginários e histórias criativas</p>

          <div className="sessao-lista-livros mt-4 flex gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div className="card-livro">
                <div className="div-img-livro">
                    <img src="https://cdn.awsli.com.br/2500x2500/2495/2495784/produto/2713792053793d743b9.jpg" alt="Livros de" className="rounded-md"/>

                    <button className="heart-favoritar">
                        <Heart className="icon-favoritar" stroke={"black"} onClick={(e)=>{if (e.target.getAttribute("stroke")=="black"){e.target.setAttribute("stroke", "red")} else{e.target.setAttribute("stroke", "black")}}}/>
                    </button>

                    <div className="btns-carrinho-detalhe">
                        <button className="btn-carrinho">
                            Adicionar ao carrinho
                            <ShoppingCart size={20} />
                        </button>
                        <button className="btn-detalhes">Ver detalhes</button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg mt-2.5 font-bold">Titulo do livro</h3>

                    <p className="text-base text-gray-300 font-medium">Autor</p>

                    <div className="flex items-center gap-2">
                        <div className="flex"> {[1,2,3,4,5].map((item)=>(<Star size={20} fill='black' onClick={(e)=>{if (e.target.getAttribute("fill")=="black"){e.target.setAttribute("fill", "yellow")} else{e.target.setAttribute("fill", "black")}}} />))} </div>
                        <p className="text-sm">Nota</p>
                        <p className="text-sm">Qtde</p>
                    </div>

                    <h3 className="text-xl font-bold mt-3">Preço</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="livros-romance" className="sessao-livros">
          <h2>Romance</h2>
          <p>Contos longos que prendem sua atenção</p>

          <div className="sessao-lista-livros mt-4 flex gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div className="card-livro">
                <div className="div-img-livro">
                    <img src="https://a-static.mlcdn.com.br/1500x1500/livro-a-barraca-do-beijo/magazineluiza/230958300/cc9cb2e8af15376ed897392ea1a9d926.jpg" alt="Livros de" className="rounded-md"/>

                    <button className="heart-favoritar">
                        <Heart className="icon-favoritar" stroke={"black"} onClick={(e)=>{if (e.target.getAttribute("stroke")=="black"){e.target.setAttribute("stroke", "red")} else{e.target.setAttribute("stroke", "black")}}}/>
                    </button>

                    <div className="btns-carrinho-detalhe">
                        <button className="btn-carrinho">
                            Adicionar ao carrinho
                            <ShoppingCart size={20} />
                        </button>
                        <button className="btn-detalhes">Ver detalhes</button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg mt-2.5 font-bold">Titulo do livro</h3>

                    <p className="text-base text-gray-300 font-medium">Autor</p>

                    <div className="flex items-center gap-2">
                        <div className="flex"> {[1,2,3,4,5].map((item)=>(<Star size={20} fill='black' onClick={(e)=>{if (e.target.getAttribute("fill")=="black"){e.target.setAttribute("fill", "yellow")} else{e.target.setAttribute("fill", "black")}}} />))} </div>
                        <p className="text-sm">Nota</p>
                        <p className="text-sm">Qtde</p>
                    </div>

                    <h3 className="text-xl font-bold mt-3">Preço</h3>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div id="livros-misterio" className="sessao-livros ">
          <h2>Mistério e Suspense</h2>
          <p>Tramas emocionantes e reviravoltas</p>

          <div className="sessao-lista-livros mt-4 flex gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div className="card-livro">
                <div className="div-img-livro">
                    <img src="https://cdn.culturagenial.com/imagens/a-vila-dos-pecados.jpg?class=article" alt="Livros de" className="rounded-md"/>

                    <button className="heart-favoritar">
                        <Heart className="icon-favoritar" stroke={"black"} onClick={(e)=>{if (e.target.getAttribute("stroke")=="black"){e.target.setAttribute("stroke", "red")} else{e.target.setAttribute("stroke", "black")}}}/>
                    </button>

                    <div className="btns-carrinho-detalhe">
                        <button className="btn-carrinho">
                            Adicionar ao carrinho
                            <ShoppingCart size={20} />
                        </button>
                        <button className="btn-detalhes">Ver detalhes</button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg mt-2.5 font-bold">Titulo do livro</h3>

                    <p className="text-base text-gray-300 font-medium">Autor</p>

                    <div className="flex items-center gap-2">
                        <div className="flex"> {[1,2,3,4,5].map((item)=>(<Star size={20} fill='black' onClick={(e)=>{if (e.target.getAttribute("fill")=="black"){e.target.setAttribute("fill", "yellow")} else{e.target.setAttribute("fill", "black")}}} />))} </div>
                        <p className="text-sm">Nota</p>
                        <p className="text-sm">Qtde</p>
                    </div>

                    <h3 className="text-xl font-bold mt-3">Preço</h3>
                </div>
              </div>
            ))}

          </div>
        </div>

      </main>

      <section className="text-center max-w-full p-12 lg:p-24 m-auto previa-resenhas">

        <p className="mb-7 flex items-center justify-center gap-1.5 ring-1 ring-gray-500 hover:ring-gray-400 text-gray-400 py-1.5 text-xs sm:text-sm w-54 rounded-full m-auto">
          <BookOpenCheck size={20} />
          Hall de Resenhas
        </p>

        <h1 className="text-5xl text-balance font-semibold sm:text-4xl">
          Descubra o que os leitores estão dizendo
        </h1>

        <h3 className="max-w-2xl m-auto text-base/6 p-3 sm:p-0 text-gray-400 font-medium my-7 sm:text-lg/8">
          Junte-se a milhares de leitores que compartilham
          experiências, descobertas e emoções em nosso espaço dedicado à literatura.
        </h3>

        <div className="flex gap-7 preview-resenha">

          {[1, 2, 3].map((item) => (
            <div
              id={`card-resenha-${item}`}
              className="w-sm bg-gray-800 flex flex-col gap-4 border rounded-2xl border-indigo-400 p-6"
              key={item}
            >
              <Quote className="text-indigo-400" />

              <p className="text-start text-lg font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ullam amet laboriosam deserunt, quo maiores fugit saepe.
              </p>

              <div className="estrelas flex">
                <Star className="fill-indigo-500 text-indigo-500" size={16} />
                <Star className="fill-indigo-500 text-indigo-500" size={16} />
                <Star className="fill-indigo-500 text-indigo-500" size={16} />
                <Star className="fill-indigo-500 text-indigo-500" size={16} />
                <Star className="text-gray-500" size={16} />
              </div>

              <hr className="text-gray-600" />

              <div className="flex items-center gap-3">
                <img
                  src="https://imgs.search.brave.com/vjxXZ2TH4aWuAagTsRnosHNbJ5nGPg1R8pAlToUtSMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQzL2Ri/LzcxLzQzZGI3MWM2/YmViNDQ5NzFjZGY1/ZmNhYzRlOWI0Njk0/LmpwZw"
                  alt=""
                  className="rounded-full w-12 h-12 object-cover"
                />

                <div className="flex flex-col items-baseline">
                  <p className="font-bold">Nome</p>
                  <p className="font-medium text-gray-300 italic text-xs">
                    Sobre o livro
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        <button className="flex items-center gap-1 m-auto rounded-md mt-10 bg-indigo-500 font-semibold px-4 py-4 transition-all hover:bg-indigo-400 hover:-translate-y-1">
          <a href="#">Ver Hall de resenhas</a>
          <ChevronsRight size={20} />
        </button>
      </section>

      <footer className="border-t border-t-gray-700 flex-1">

        <div id="newsletter" className="bg-gray-800 rounded-xl max-w-7xl m-auto my-10 flex sm:flex-row md:flex-row flex-col sm:gap-0 gap-4 items-center justify-between p-2 sm:p-10">
          <div>
            <h2 className="text-white font-bold text-base">
              Receba resenhas na sua caixa de entrada
            </h2>

            <p className="text-gray-400 font-medium text-sm">
              Uma newsletter semanal com os livros mais bem avaliados e
              recomendações da comunidade.
            </p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Seu email"
              className="rounded-md font-medium w-xs bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />

            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer hover:bg-indigo-400"
            >
              Assinar
            </button>
          </div>
        </div>

        <div id="links-footer" className="grid grid-cols-1 sm:grid-cols-4 max-w-7xl m-auto my-16 gap-6 sm:gap-0 items-center text-center sm:text-left justify-items-center p-2 sm:p-5 text-sm">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2.5 justify-center sm:justify-start">
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" className="fa-brands fa-tailwind-css fa-2xl" style={{ color: "oklch(67.3% .182 276.935)" }}/>
              Página
            </h3>

            <p className="text-gray-400 font-medium">
              Uma livraria feita por leitores. Compre livros e descubra o que a
              comunidade realmente achou de cada um.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Explorar</h3>

            <ul>
              <li><a href="#">Lançamentos</a></li>
              <li><a href="#">Mais vendidos</a></li>
              <li><a href="#">Resenhas</a></li>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Promoções</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Institucional</h3>

            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Trabalhe conosco</a></li>
              <li><a href="#">Termos de uso</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Segurança</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Ajuda</h3>

            <ul>
              <li><a href="#">Central de ajuda</a></li>
              <li><a href="#">Entregas e frete</a></li>
              <li><a href="#">Trocas e devoluções</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-div-redes my-6 max-w-7xl">
          <hr className="text-gray-700 mb-5" />

          <div className="w-full flex items-center justify-between">
            <p className="font-medium text-sm text-gray-400">© 2026 Livraria. Todos os direitos reservados.</p>

            <div className="text-gray-300 flex">
              <SocialIcon url="https://www.instagram.com/teamhmble/" network="instagram" bgColor='#11182700'/>
              <SocialIcon url="https://www.tiktok.com/@teamhmble" network="tiktok" bgColor='#11182700'/>
              <SocialIcon url="https://x.com/TeamHmble" network="x" bgColor='#11182700'/>
              <SocialIcon url="https://www.youtube.com/@teamhmble" network="youtube" bgColor='#11182700'/>
              <SocialIcon url="https://github.com/JoaoSuriano17/Livraria_FESO" network="github" bgColor='#11182700'/>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
