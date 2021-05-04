import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function AdminLogin({ isLogin, setLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    e.preventDefault();
    async function fetchData() {
      await axios
        .post("https://backendpost.herokuapp.com/api/auth", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("x-auth-token", res.data.token);
          setUser(res.data);
          setLogin(true);
          history.replace("/posts");
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
    fetchData();
  };
  return !isLogin ? (
    <div>
      <Link to="/" to="/" style={{ textDecoration: "none" }}>
        <h1>Back to HomePage</h1>
      </Link>
      <p>Login as admin</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button
          style={{
            backgroundColor: "black",
            height: "40px",
            width: "100px",
            fontSize: "20px",
            color: "aqua",
            border: "1px solid aqua",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          type="submit"
        >
          Login
        </button>
      </form>
      <p>Dont have account?</p>
      <button
        style={{
          backgroundColor: "black",
          height: "40px",
          width: "100px",
          fontSize: "20px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => history.replace("./admin-signup")}
      >
        SignUp
      </button>
    </div>
  ) : null;
}

export default AdminLogin;
