import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const Navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        Navigate('/')
    }
  return (
    <button onClick={logout}>Login</button>
  )
}

export default LogoutButton