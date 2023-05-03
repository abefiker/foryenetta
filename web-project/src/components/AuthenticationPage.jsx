import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function AuthenticationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signupstatus, setSignupstatus] = useState('')
  const navigate = useNavigate() 
  
  const signup =(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3002/sign-up",{
      username:username,
      password:password,
      email:email
      }).then((res)=> {

         console.log(res)
          if(res.status=== 200){
            navigate("/Login")
          } else {
            alert("info aready exited ensert correct one")
          }
    })
      .catch(err => console.log(err))
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit =(e)=>{
    e.preventDefault()
  }

  return (
    <> 
    <div className='formdiv'>
        <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' onChange={handleUsernameChange}/>
        <input type="text" placeholder='email' onChange={handleEmailChange}/>
        <input type="text" placeholder='password' onChange={handlePasswordChange}/>
        <div className='buttondiv'>
            <button onClick={signup}>sign up</button>
            <Link to='/Login' className='btn'>
               already have account
            </Link>
            
        </div>
      </form>
    </div>
    </>
  )
}

export default AuthenticationPage
