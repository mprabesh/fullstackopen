import Notification from "./Notification";

const LoginForm = ({
  handleLogin,
  userCredentials,
  setuserCredentials,
  notificationMessage,
}) => {
  return (
    <div>
      <h2>login to application</h2>
      <Notification notificationMessage={notificationMessage} />
      <form onSubmit={handleLogin}>
        username{" "}
        <input
          type="text"
          value={userCredentials.username}
          onChange={(e) =>
            setuserCredentials({ ...userCredentials, username: e.target.value })
          }
        />
        <br />
        password{" "}
        <input
          type="password"
          value={userCredentials.password}
          onChange={(e) =>
            setuserCredentials({ ...userCredentials, password: e.target.value })
          }
        />
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
