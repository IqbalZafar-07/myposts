import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const history = useHistory();
  return (
    <div style={{ paddingTop: "20vh" }}>
      <h1>Hello user, Welcome!!</h1>
      <button
        style={{
          backgroundColor: "black",
          height: "50px",
          width: "300px",
          fontSize: "30px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "10px",
          marginBottom: "5vh",
          cursor: "pointer",
        }}
        onClick={() => {
          history.push("user-login");
        }}
      >
        Login as user
      </button>
      <br />
      <button
        style={{
          backgroundColor: "black",
          height: "50px",
          width: "300px",
          fontSize: "30px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          history.push("admin-login");
        }}
      >
        Login as admin
      </button>
    </div>
  );
}

export default HomePage;
