import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Offcanvas from "./offcanvas";

const NavBar = (props) => {
  const { user } = props;
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
    document.body.classList.toggle("no-scroll");
  };

  const navLinks = () => {
    return (
      <React.Fragment>
        <NavLink className="nav-link" aria-current="page" to="/article">
          Artikel
        </NavLink>
        <NavLink className="nav-link" aria-current="page" to="/shoppingcart">
          Warenkorb{" "}
          {props.counter > 0 && (
            <span className="badge rounded-pill bg-secondary">
              {props.counter}
            </span>
          )}
        </NavLink>
      </React.Fragment>
    );
  };

  return (
    <>
      <Offcanvas
        counter={props.counter}
        show={showOffcanvas}
        close={toggleOffcanvas}
        loggedIn={user.loggedIn}
      />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <button
            className="custom-toggler navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navWebshop"
            aria-controls="navWebshop"
            aria-expanded={!showOffcanvas ? true : false}
            aria-label="Toggle navigation"
            onClick={toggleOffcanvas}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link
            className="navbar-brand mx-auto"
            to={user.loggedIn ? "/article" : "/login"}
          >
            Webshop
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto ms-lg-3">
              {user.loggedIn === "true" && navLinks()}
            </ul>
          </div>
          <ul className="navbar-nav">
            {user.loggedIn === "true" ? (
              <span
                className="navbar-text clickable navbar-login-icon"
                onClick={props.onLogout}
              >
                <h3 className="m-0">
                  <i className="bi bi-box-arrow-left me-2"></i>
                </h3>
              </span>
            ) : (
              <Link
                className="navbar-text clickable navbar-login-icon"
                to="/login"
              >
                <h3 className="m-0">
                  <i className="bi bi-box-arrow-in-right"></i>
                </h3>
              </Link>
            )}

            {user.loggedIn === "true" ? (
              <div className="navbar-login-text">
                <span
                  className="navbar-text clickable"
                  onClick={props.onLogout}
                >
                  Ausloggen <i className="bi bi-box-arrow-left"></i>
                </span>
              </div>
            ) : (
              <div className="navbar-login-text">
                <NavLink className="nav-link " aria-current="page" to="/login">
                  Einloggen <i className="bi bi-box-arrow-in-right"></i>
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
