import React, { useContext } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { RootStoreContext } from "../providers/RootProvider";
import home from "../assets/home.svg";

import "../BaseStyles.scss";
import "./Header.scss";

export const Header = observer((props) => {
  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { authStore } = rootStore;
  const { context } = authStore;
  const { currentUser } = context;

  async function logout() {
    await authStore.logoutUser();
    rootStore.resetRootStore();
    navigate("/login");
  }

  function login() {
    navigate("/login");
  }

  function navigateToHome() {
    navigate("/");
  }

  function navigateToAdminPanel() {
    navigate("/admin-panel");
  }

  return (
    <header>
      <div className="Header__logo" onClick={navigateToHome}>
        <img src={home} alt="Pet Hub" className="logo-picture" />
      </div>
      <div className="Header__navButtons">
        {currentUser && (
          <a className="HeaderItem" onClick={navigateToAdminPanel}>
            Admin Panel
          </a>
        )}
        <div className="HeaderItem__manage">
          {currentUser ? (
            <button className="Button__green" onClick={logout}>
              Log Out
            </button>
          ) : (
            <button className="Button__green" onClick={login}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
