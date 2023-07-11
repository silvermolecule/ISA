import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {validPassword } from './Regex.jsx';
const SignUp = () => {
  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
    const {createUser,user} = UserAuth()
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (validPassword.test(password)) {
          try {
            await createUser(email, password);
            navigate("/account");
          } catch (e) {
            setError(e.message);
            console.log(e.message);
          }
       }else{
        setError("awhdboywbEnter Valid password")
       }
      

      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br />
            <input type="password" placeholder='Enter your Password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br />
            <button>Signup</button>
            <br />
            <Link to={"/signin"}>SignIn</Link>
        </form>
        <p>{error.slice(9)}</p>
    </div>
  )
}

export default SignUp
