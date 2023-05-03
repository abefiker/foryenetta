import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginstatus, setLoginstatus] = useState('')
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const navigate = useNavigate()
  const login = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:3002/Login",{
      email:email,
      password:password
    }).then((response)=>{
      console.log(response)
      if(response.status === 200){
        localStorage.setItem("id",response.data.id)
        navigate("/")
      }else{
        alert("in correct info")
      }
    })
  }
  return (
    <div>
      <form className='login'>
        <h1>Login</h1>
        <input type="text" placeholder='email' onChange={handleEmailChange}/>
        <input type="text" placeholder='password' onChange={handlePasswordChange}/>
        <div className='buttondiv'>
            <button onClick={login}>Login</button>
            <Link to='/sign-up' className='btn'>
              create account
            </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
