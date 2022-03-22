import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import logo from "./img/logo-img.png"
import * as yup from 'yup';
import "./register.css"

function Register() {

  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    let schema = yup.object().shape({
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Erro: Senhas não corresponden'),
      password: yup.string().required("O campo Senha deve ser preenchido")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "A senha deve conter 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
        ),
      email: yup.string().email().required("O campo Email deve ser preenchido"),
      last_name: yup.string().required("O campo Sobrenome deve ser preenchido"),
      first_name: yup.string().required("O campo Nome deve ser preenchido"),
    })

    try {

      await schema.validate(state)

      const userData = {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
      };

      axios.post('https://financereview.herokuapp.com/cadastrar', userData)
        .then((response) => {
          console.log(response);
          setStatus({
            type: "success",
            mensagem: "Cadastrado com Sucesso"
          })
          setTimeout(() => {
            navigate(`/login`)
          }, 2000)
        }).catch((err) => {
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
      <div className="logo-register" >
        <a href="https://financereview.netlify.app/"><img src={logo} alt="logo-finance-review"></img></a>
      </div>

      <div className="container-register">

        <div className="validação-register">
          {status.type === "success" ? <p style={{ color: "green", marginLeft: "5px" }}>{status.mensagem}</p> : ""}
          {status.type === "error" ? <p style={{ color: "red", marginLeft: "5px" }}>{status.mensagem}</p> : ""}
        </div>

        <form className="formulario-register" onSubmit={handleSubmit}>

          <label htmlFor="first_name"> Nome </label>
          <input type="text" name="first_name" value={state.first_name} onChange={handleChange} />

          <label htmlFor="last_name"> Sobrenome </label>
          <input type="text" name="last_name" value={state.last_name} onChange={handleChange} />

          <label htmlFor="email"> E-mail </label>
          <input type="email" name="email" value={state.email} onChange={handleChange} />

          <label htmlFor="password"> Senha </label>
          <input type="password" name="password" value={state.password} onChange={handleChange} />

          <label htmlFor="confirmPassword"> Confirmar Senha </label>
          <input type="password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} />

          <button type="submit" >cadastrar</button>

          <p>Já se cadastrou?<a href="https://financereview.netlify.app/login"> Entre</a></p>

        </form>
      </div>
    </>
  );
};

export default Register;