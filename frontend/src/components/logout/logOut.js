import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'
import './logout.css'

function LogOut(){

let navigate = useNavigate()

function logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        navigate(`/login`)
      }

    return (
      <div className='container-logout'>
        <p onClick={logout}><FaPowerOff/><span className='text-logout'>Logout</span></p>
      </div>
    )
}

export default LogOut;