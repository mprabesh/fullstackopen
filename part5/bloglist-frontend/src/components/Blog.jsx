import { useState } from "react";

const Blog = ({ blog, handleLikesUpdate, handleDelete }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const currUser = JSON.parse(localStorage.getItem("userData")).username;
  return (
    <div style={blogStyle} className="a_blog">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      <br />
      {view ? (
        <div className="blog-info">
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button onClick={() => handleLikesUpdate(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.username === currUser ? (
            <button onClick={() => handleDelete(blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
