import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { login } from "../service";
import { Link } from "react-router-dom";
import { GetUser } from "../redux/actions";

export const LogInComponent = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState();

  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const history = useHistory();
  useEffect(() => {
    if (user.id) history.replace("/");
  }, [user]);
  const handleSubmit = async () => {
    try {
      const res = await login(usernameOrEmail, password);
      localStorage.setItem("token", res.headers["x-auth-token"]);
      GetUser(res.data);
    } catch (error) {
      setErrors(error.response.data.split("-"));
    }
  };
  return (
    <section className="login_component">
      <h1 className="login_title">Log in</h1>
      <div className="login_component_container">
        <label
          htmlFor="emailOrUsername"
          className={focused === "emailOrUsername" ? "label" : "hidden"}
        >
          Email or Username
        </label>
        <input
          id="emailOrUsername"
          onFocus={() => {
            setFocused("emailOrUsername");
            setErrors();
          }}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          placeholder="username or email"
        />
        <label
          htmlFor="password"
          className={focused === "password" ? "label" : "hidden"}
        >
          Password
        </label>

        <input
          id="password"
          className="password"
          type="password"
          onFocus={() => {
            setFocused("password");
            setErrors();
          }}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <div className="login_buttons">
          <button className="login_submit" onClick={handleSubmit}>
            Log in
          </button>
          <Link className="register_link" to="/register">
            Sign in
          </Link>
        </div>
        <ul className="errors">
          {errors &&
            errors.map((error) => {
              return <li>{error}</li>;
            })}
        </ul>
      </div>
    </section>
  );
};
