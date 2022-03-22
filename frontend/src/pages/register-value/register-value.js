import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import SideBar from '../../components/sideBar/sideBar'
import './register-value.css'

function Financial() {
  
  const [state, setState] = useState({
    cash_value: "",
    description: ""
  });

  function handleChange (e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  
  let navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();

   
    const userData = {

        cash_value: state.cash_value.replace(/[R$.,]+/g,""),
        description: state.description
    };
    
    axios.post('https://financereview.herokuapp.com/registrar-valor', userData)
     .then((response) => {
        console.log(response);
        navigate(`/main`)
    }).catch((err) => {
        console.log(err.response)
    });
  };

  useEffect(() => {  
    if(!localStorage.usertoken){
      navigate(`/login`)
    } 
})

return (
<>
  < SideBar />

  <div className="container-register-value"> 

      <form onSubmit={handleSubmit}>

        <input type="text" name="cash_value" value={state.cash_value} placeholder="Valor" onChange={handleChange} />
        
        <input type="text" name="description" value={state.description} placeholder="Descrição" onChange={handleChange} />
        
        <button type="submit" className="btn btn-success">Salvar</button>
      </form>
      
    </div>
</>  
  );
};

export default Financial;