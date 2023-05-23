import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { auth } from "../services/authService";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [awaitLogin, setAwaitLogin] = useState(false);

  const doSubmit = async (e) => {
    e.preventDefault();
    setAwaitLogin(true);

    try {
      const {
        data: { accessToken },
      } = await auth(data);

      if (accessToken) {
        sessionStorage.setItem("token", accessToken);

        const { displayName, groupname, mail, username } =
          decodeToken(accessToken);

        if (groupname !== "Admin") {
          sessionStorage.setItem("groupname", "user");
        } else sessionStorage.setItem("groupname", "admin");

        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("displayName", displayName);
        sessionStorage.setItem("mail", mail);
      }
    } catch (e) {
      console.error(e);
      setAwaitLogin(false);
      setData({ username: "", password: "" });
    }

    navigate("/article");
    onLogin("true");
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const buttonClasses = "btn btn-danger mt-3";

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-8 mt-5">
        <form onSubmit={doSubmit}>
          <input
            className="mb-3 form-control"
            type="text"
            name="username"
            placeholder="Anmeldekürzel"
            onChange={handleChange}
            value={data.username}
          />
          <input
            className="mb-3 form-control"
            type="password"
            name="password"
            placeholder="Passwort"
            onChange={handleChange}
            value={data.password}
          />
          {!awaitLogin ? (
            <button
              className={buttonClasses}
              disabled={!data.username || (!data.password && true)}
            >
              Einloggen
            </button>
          ) : (
            <button className="btn btn-danger mt-3" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
        </form>
      </div>
      <div className="col" />
    </div>
  );
}

export default LoginForm;
