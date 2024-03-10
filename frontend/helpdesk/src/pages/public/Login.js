import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../providers/RootProvider";

import "./Login.scss";
import "../../BaseStyles.scss";

export function Login(props) {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  async function onClick() {
    const payload = {
      username,
      password,
    };

    const loginResult = await authStore.loginUser(payload);

    const { loggedIn, message } = loginResult;

    if (loggedIn) {
      navigate("/");
    } else {
      setErrorMessage(message);
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Admin Login</h1>
        <div className="Login__fields">
          <div className="Login__form">
            <div className="Login__loginItem">
              <label htmlFor="username" className="login-labels">
                Username:
              </label>
              <input
                type="email"
                id="username"
                name="username"
                placeholder="Username"
                className="TextField__GreenOutline login-fields"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="Login__loginItem">
              <label htmlFor="password" className="login-labels">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="TextField__GreenOutline login-fields"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button">
              <button className="Button__green login-button" onClick={onClick}>
                Log In
              </button>
            </div>
          </div>
          {showErrorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
