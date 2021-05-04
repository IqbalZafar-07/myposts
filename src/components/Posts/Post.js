import React from "react";
import { useHistory } from "react-router";

function Post({ post, setElement }) {
  const history = useHistory();
  return (
    <div style={{ marginTop: "20vh" }}>
      <h3>Title: {post.title}</h3>
      <h3>Author: {post.author}</h3>
      <h3>Content: {post.content}</h3>
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
          setElement(post);
          history.push("/editpost");
        }}
      >
        Edit post
      </button>
    </div>
  );
}

export default Post;
