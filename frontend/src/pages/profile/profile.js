import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import SideBar from '../../components/sideBar/sideBar'
import './profile.css'

function Profile() {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.usertoken) {

      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email
      })

    }
  }, [])

  useEffect(() => {
    if (!localStorage.usertoken) {
      navigate(`/login`)
    }
  })

  return (
    <div className="container-profile">

      < SideBar />

      <div className='container-dados'>
        <h1>Dados Do Usuário</h1>
        <p><label>Nome:</label> {state.first_name} {state.last_name}</p>
        <p><label>Email:</label> {state.email}</p>
      </div>

    </div>
  )
}

export default Profile

