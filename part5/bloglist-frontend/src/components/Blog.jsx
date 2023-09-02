import { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      <br />
      {view ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
          <br />
          {blog.user.name}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
