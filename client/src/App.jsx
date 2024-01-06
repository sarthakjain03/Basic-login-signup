import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landingpage from './pages/Landingpage'
import Homepage from './pages/Homepage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/' element={<Landingpage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Homepage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
