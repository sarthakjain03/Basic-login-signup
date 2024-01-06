import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { logout } from '../actions/apicalls'

const Homepage = () => {
  const location = useLocation()
  const history = useNavigate()

  const handleLogout = () => {
    logout()
    history('/')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <p>My name is {location.state.name}.</p>
      <p>My email id is {location.state.email}.</p>
      <p>I am a {location.state.gender}.</p>
      <p>My number is {location.state.phone}.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Homepage