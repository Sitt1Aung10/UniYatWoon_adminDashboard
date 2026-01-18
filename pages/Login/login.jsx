import { useState } from "react";
import endpoints from "../../endpoints/endpoints";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email, Password })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        // ✅ save JWT
        localStorage.setItem("token", data.token);

        // ✅ save user info (UI / later use)
        const userData = {
          username: data.username,
          user_uuid: data.user_uuid
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <>
      {user ? (
        <h1>Welcome, {user.username} 👋</h1>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={Email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            value={Password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
}

export default Login;
