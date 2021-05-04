import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Post from "./Post";

function Posts({ setLogin, setUser, setElement, element }) {
  const [post, setPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const allPost = () => {
    async function fetchData() {
      await axios.get("http://localhost:3000/api/posts").then((res) => {
        console.log(res);
        setPost(res.data);
      });
    }
    fetchData();
  };

  const singlePost = (ele) => {
    console.log(ele);
    async function fetchData() {
      await axios
        .get(`http://localhost:3000/api/posts/${ele._id}`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
        });
    }
    fetchData();
  };

  const searchByTitle = () => {
    async function fetchData() {
      await axios
        .get(`http://localhost:3000/api/posts/?filterBy=${postTitle}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    fetchData();
  };

  const deletePost = (ele) => {
    async function fetchData() {
      await axios
        .delete(`http://localhost:3000/api/posts/${ele._id}`, {
          data: {
            header: { "x-auth-token": localStorage.getItem("x-auth-token") },
          },
        })
        .then((res) => {
          alert("deleted post please refresh");
        })
        .catch((err) => {
          setError(err.response.data);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
    fetchData();
  };

  return (
    <div className="posts" style={{ paddingTop: "10vh" }}>
      <p style={{ color: "red" }}>{error}</p>
      <button
        style={{
          backgroundColor: "black",
          height: "40px",
          width: "200px",
          fontSize: "20px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={allPost}
      >
        View all posts
      </button>
      <br />
      <br />
      <input
        style={{ height: "30px", width: "200px", fontSize: "20px" }}
        value={postTitle}
        onChange={(e) => {
          setPostTitle(e.target.value);
        }}
      />
      <button
        style={{
          backgroundColor: "black",
          height: "40px",
          width: "200px",
          fontSize: "20px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={searchByTitle}
      >
        Search by title
      </button>
      <br />
      <br />
      <button
        style={{
          backgroundColor: "black",
          height: "40px",
          width: "200px",
          fontSize: "20px",
          color: "aqua",
          border: "1px solid aqua",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => history.push("/createpost")}
      >
        create a post
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      {post &&
        (post.map ? (
          <div>
            {post.map((ele) => (
              <h3>
                title: {ele.title}&nbsp;&nbsp;&nbsp; author: {ele.author}
                &nbsp;&nbsp;&nbsp;
                {ele.content && `Content : ${ele.content}`}&nbsp;&nbsp;&nbsp;
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
                  onClick={() => {
                    singlePost(ele);
                  }}
                >
                  view Post
                </button>
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
                  onClick={() => {
                    deletePost(ele);
                  }}
                >
                  Dlete post
                </button>
              </h3>
            ))}
          </div>
        ) : (
          <Post post={post} setElement={setElement} element={element} />
        ))}
      <br />
      <br />
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
        onClick={() => {
          setLogin(false);
          setUser("");
          localStorage.removeItem("x-auth-token");
          history.replace("/");
        }}
      >
        LogOut
      </button>
    </div>
  );
}

export default Posts;
