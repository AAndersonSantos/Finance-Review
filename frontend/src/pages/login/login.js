import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import logo from "./img/logo-img.png"
import * as yup from 'yup';
import "./login.css"

function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    let schema = yup.object().shape({
      password: yup.string().required("O campo Senha deve ser preenchido"),
      email: yup.string().email().required("O campo E-mail deve ser preenchido")
    })

    try {
      await schema.validate(state)
      
      const userData = {
        email: state.email,
        password: state.password
      };

      axios.post('https://financereview.herokuapp.com/login', userData).then((response) => {
        const dataToken = response
        if (dataToken) {
          localStorage.setItem('usertoken', JSON.stringify(dataToken))
          setStatus({
            type: "success",
            mensagem: "Login Realizado com sucesso"
          })
          console.log(response);
          console.log("Login Realizado com sucesso!")
          setTimeout(() => {
          navigate(`/loading`)
          }, 2000)
          setTimeout(() => {
            navigate(`/main`)
          }, 5000)
        }
      }).catch((err) => {
        setStatus({
          type: "error",
          mensagem: "Email ou senha incorretos"
        })
        console.log(err.response)
      });

    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors
      })
    }

  };

  useEffect(() => {
    document.body.style.backgroundColor = "#4682B4"
  })

  return (
    <>
      <div className="logo-login" >
        <a href="https://financereview.netlify.app/"><img src={logo} alt="logo-finance-review"></img></a>
      </div>

      <div className="container-login">

        <h1>Entrar</h1>

        <form className="formulario-login" onSubmit={handleSubmit}>

          <input type="email" name="email" value={state.email} placeholder="E-mail" onChange={handleChange} />

          <input type="password" name="password" value={state.password} placeholder="Senha" onChange={handleChange} />

          <button type="submit">Entrar</button>

          <p>É novo por aqui? <a href="https://financereview.netlify.app/cadastrar"> Cadastre-se</a></p>
        </form>

        <div className="validação-login">
          {status.type === "success" ? <p style={{ color: "green", marginLeft: "5px" }}>{status.mensagem}</p> : ""}
          {status.type === "error" ? <p style={{ color: "red" }}>{status.mensagem}</p> : ""}
        </div>

      </div>
    </>
  );

};

export default Login;