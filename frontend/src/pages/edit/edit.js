import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom'
import './edit.css'

function Edit() {

  const { id } = useParams()

  let navigate = useNavigate()

  const [state, setState] = useState({
    cash_value: "",
    description: ""
  });


  function handleChange (e) {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`https://financereview.herokuapp.com/lista-de-valores/${id}`)
    .then((res) => {

        setState({
        cash_value:  new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(res.data.cash_value  / 100),
        description: res.data.description
      })

  }).catch((err) => {
    console.log(err.response)
  })

  }, [])
  
  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
        cash_value: state.cash_value.replace(/[R$.,]+/g,""),
        description: state.description
    };

    axios.put(`https://financereview.herokuapp.com/editar/${id}`, userData)
    .then((response) => {
      console.log(response);
      navigate(`/main`)
    }).catch((err) => {
      console.log(err.response)
    })

  };

  useEffect(() => {  
    if(!localStorage.usertoken){
      navigate(`/login`)
    } 
})

useEffect(() => {
  document.body.style.backgroundColor = "#d3dfe1"
})

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit}>
        <h1>Editar</h1>

        <label htmlFor="cash_value"> Valor </label>          
        <input type="text" name="cash_value" value={state.cash_value} onChange={handleChange} />

        <label htmlFor="description"> Descrição </label>
        <input type="text" name="description" value={state.description} onChange={handleChange} />
        
        <button className="btn btn-success" type="submit">Editar</button>
        <button className='btn btn-danger' onClick={() => navigate(`/main`)}>Cancelar</button>
      </form>
    </div>
  );
};

export default Edit;