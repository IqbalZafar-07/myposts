import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function AdminSignup({ isLogin, setLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    async function fetchData() {
      await axios
        .post("https://backendpost.herokuapp.com/api/users", {
          name: name,
          email: email,
          password: password,
          isAdmin: "true",
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Sign up as admin</p>
      <form onSubmit={handleSubmit}>
        <label>Full Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
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
          SignUp
        </button>
      </form>
    </div>
  ) : null;
}

export default AdminSignup;
