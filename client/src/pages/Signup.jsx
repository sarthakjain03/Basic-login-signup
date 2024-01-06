import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signup } from '../actions/apicalls'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')

  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signup(name, email, gender, phone, password);
      // console.log(data);
      if(data)
        history('/home', {state: {id: data.email, name: data.name, email: data.email, gender: data.gender, phone: data.phone}})

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sign Up</h1>
      <form
        action='POST'
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "20px 0" }}
        />
        <input
          type="email"
          placeholder="Email Id"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "0 0 20px" }}
        />
        <input
          type="text"
          placeholder="Gender"
          onChange={(e) => setGender(e.target.value)}
          style={{ margin: "0 0 20px" }}
        />
        <input
          type="number"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
          style={{ margin: "0 0 20px" }}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "0 0 20px" }}
        />
        <button type="submit" onClick={handleSubmit} style={{padding: '10px'}}>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup