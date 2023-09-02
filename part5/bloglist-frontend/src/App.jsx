import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogServices from "./services/blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setuser] = useState(null);
  const [userCredentials, setuserCredentials] = useState({
    username: "",
    password: "",
  });
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  useEffect(() => {
    BlogServices.getAll()
      .then((result) => setBlogs(result.data))
      .catch((err) => console.log(err));
    setuser(JSON.parse(window.localStorage.getItem("userData")));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    BlogServices.login(userCredentials)
      .then((result) => {
        setuser(result.data);
        window.localStorage.setItem("userData", JSON.stringify(result.data));
        setuserCredentials({
          username: "",
          password: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const addBlog = (e) => {
    e.preventDefault();
    BlogServices.addBlog(newBlog)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  const logout = () => {
    setuser(null);
    window.localStorage.removeItem("userData");
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          userCredentials={userCredentials}
          setuserCredentials={setuserCredentials}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          {user.name} logged in <button onClick={logout}>logout</button>
          <AddBlogForm
            addBlog={addBlog}
            setNewBlog={setNewBlog}
            newBlog={newBlog}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
