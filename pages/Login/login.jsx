import { useState } from "react";
import React from "react";
import endpoints from "../../endpoints/endpoints";
import Profile from "../Login/get_session";

function Login() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggedIn(true);

    const res = await fetch(
      (endpoints.login),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include', // important: sends cookies
        body: JSON.stringify({
          Username,
          Email,
          Password,
        })
      }
    );

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (data.success) {
      setUser(data.Username); // 🔥 THIS updates UI
      // setUser({ username: data.Username, uuid: data.user_uuid });

      // localStorage.setItem("Username", data.Username);
      // localStorage.setItem("user_uuid", data.user_uuid);
      // const storedUsername = localStorage.getItem("Username");
      // const storedUuid = localStorage.getItem("user_uuid");
      // if (storedUsername && storedUuid) {
      //   console.log("localStorage saved:", { storedUsername, storedUuid });
      // } else {
      //   console.log("localStorage save failed:", { storedUsername, storedUuid });
      // }
      // }
    } else {
      alert(data.message);
    }
  };



  return (
    <>
         <Profile />  
        {user ? (
        <h1>Welcome, {user} 👋</h1>
      ) : (
        <form>
          <input
            type="text"
            name='Username'
            value={Username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            name='Email'
            value={Email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="Password"
            value={Password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} type="submit">Login</button>
        </form>
      )}
    </>
  );
}

export default Login;
