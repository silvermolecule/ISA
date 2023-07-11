import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const {signIn,user} = UserAuth()
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          await signIn(email, password);
          navigate("/account");
        } catch (e) {
          setError(e.message);
          console.log(e.message);
        }
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <br />
            <input type="password" placeholder='Enter your Password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <br />
            <button>SignIn</button>
            <br />
            <Link to={"/"}>SignUp</Link>
        </form>
        <p>{error.slice(9)}</p>
    </div>
  )
}

export default SignIn
