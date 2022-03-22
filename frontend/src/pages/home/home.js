import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import imagem from "./img/cad27778217581.5c9e1ee08cf23.png"
import imagemDetails from "./img/337e7178217581.5c9e1ee08d0ca.png"
import linkedin from "./img/linkedin.png"
import github from "./img/github.png"
import logo from "./img/logo-img.png"
import "./home.css"

function Home() {

    let navigate = useNavigate()

    function login(e) {
        e.preventDefault()
        navigate(`/login`)
    }

    function register(e) {
        e.preventDefault()
        navigate(`/cadastrar`)
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#d3dfe1"
    })

    return (
        <>
            <div className="container-home">

                <img className="imagem" src={imagem} alt="decorative-image"></img>

                <div className="container-home-side">

                    <div className="logo" >
                        <img src={logo} alt="logo-finance-review"></img>
                    </div>

                    <div className="slogam">
                        <p>Gerencie seus gastos com mais facilidade</p>
                    </div>

                    <div className="btn-home">
                        <button className="btn-login" onClick={login}>Entrar</button>
                        <button className="btn-register" onClick={register}>Cadastra-se agora</button>
                    </div>

                </div>

            </div>

            <div className="container-details">

                <div className="textDetails">
                    <p>
                        Finance Review é um gerenciador financeiro para controle de gastos,
                        veja com o que está gastando de forma prática e organizada,
                        tenha o saldo total de todos os seus gastos.
                        Finance Review é oque você precisa para manter suas finanças organizadas.
                    </p>
                </div>

                <div className="imagemDetails">
                    <img src={imagemDetails} alt="decorative-image"></img>
                </div>

            </div>

            <footer>

                <section className="midia">
                    <div className="logo-linkedin ">
                        <a href="https://www.linkedin.com/in/anderson-santos-19a5601a8/" target="_blank" rel="noreferrer"><img className="linkedin " src={linkedin} alt="logo-linkedin"></img></a>
                    </div>

                    <div className="logo-github ">
                        <a href="https://github.com/AAndersonSantos" target="_blank" rel="noreferrer"><img className="github " src={github} alt="logo-github"></img></a>
                    </div>
                </section>

                <section className="footer-text">
                    <p>
                        Finance Review é um gerenciador financeiro para controle de gastos, este é um projeto ainda em evolução 
                        e foi criado por Anderson santos. Para mais informação entre em contato.
                    </p>
                </section>

                <section className="footer-text-2">
                    <p>@2022 Direitos autorais:<span>Anderson Santos</span></p>
                </section>

            </footer>

        </>
    );
};

export default Home;