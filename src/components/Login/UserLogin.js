import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function UserLogin({ isLogin, setLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    async function fetchData() {
      await axios
        .post("http://localhost:3000/api/auth", {
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Back to HomePage</h1>
      </Link>
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
          type="submit"
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
        onClick={() => history.replace("./user-signup")}
      >
        SignUp
      </button>
    </div>
  ) : null;
}

export default UserLogin;
