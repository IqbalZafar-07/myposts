import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    async function fetchData() {
      await axios
        .post("https://backendpost.herokuapp.com/api/posts", {
          title: title,
          author: author,
          content: content,
          header: { "x-auth-token": localStorage.getItem("x-auth-token") },
        })
        .then((res) => {
          history.replace("/posts");
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
    fetchData();
  };

  return (
    <div style={{ paddingTop: "10vh" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handelSubmit}>
        <label>title:</label>
        <input
          style={{ height: "30px", width: "200px", fontSize: "20px" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <label>author:</label>
        <input
          style={{ height: "30px", width: "200px", fontSize: "20px" }}
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <br />
        <label>content:</label>
        <input
          style={{ height: "30px", width: "200px", fontSize: "20px" }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button
          style={{
            backgroundColor: "black",
            height: "40px",
            width: "150px",
            fontSize: "20px",
            color: "aqua",
            border: "1px solid aqua",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
