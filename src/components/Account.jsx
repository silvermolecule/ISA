import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const Account = () => {
  const {user,logout}  = UserAuth();
  const navigate = useNavigate();
  console.log(user.emailVerified);
  const handlelogout = ()=>{
    logout().then(()=>{
      navigate("/")
    })
  }
  return (
    <div>
      {!user?.emailVerified && <div>
            Verify your email
        </div>}
        {
          user?.emailVerified && <div>
             Hi <br />{user?.email}
          </div>
        }
        <button onClick={handlelogout}>logout</button>
    </div>
  )
}

export default Account
