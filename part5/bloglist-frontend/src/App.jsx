import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogServices from "./services/blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setuser] = useState(null);
  const [userCredentials, setuserCredentials] = useState({
    username: "",
    password: "",
  });
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    messageTypeError: false,
  });

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
        setNotificationMessage({
          ...notificationMessage,
          message: "Logged in successfully.",
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            messageTypeError: false,
          });
        }, 3000);
        setuserCredentials({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        setNotificationMessage({
          message: err.response.data.error,
          messageTypeError: true,
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            messageTypeError: false,
          });
        }, 3000);
        setuserCredentials({
          username: "",
          password: "",
        });
      });
  };

  const addBlog = (e) => {
    e.preventDefault();
    BlogServices.addBlog(newBlog)
      .then((result) => {
        setNotificationMessage({
          ...notificationMessage,
          message: `a new blog ${result.data.title} by ${result.data.author} added.`,
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            messageTypeError: false,
          });
        }, 3000);
        setNewBlog({ title: "", author: "", url: "" });
      })
      .catch((err) => {
        setNotificationMessage({
          messageTypeError: true,
          message: err.response.data.error,
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            messageTypeError: false,
          });
        }, 3000);
        setNewBlog({ title: "", author: "", url: "" });
      });
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
          notificationMessage={notificationMessage}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          <Notification notificationMessage={notificationMessage} />
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
