import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Account = () => {
  const { user, logout } = UserAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log(user.emailVerified);
  const handlelogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      let data1 = [];
      querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
      });
      setData(data1);
      // console.log(vrdata);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!user?.emailVerified && <div>Verify your email</div>}
      {user?.emailVerified && (
        <div>
          Hi <br />
          {user?.email}
          <br />
          {data.map((da) => {
            return <h4>Hashed Password : {da.password}</h4>;
          })}
        </div>
      )}
      <button onClick={handlelogout}>logout</button>
    </div>
  );
};

export default Account;
