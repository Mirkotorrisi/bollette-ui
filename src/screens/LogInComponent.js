import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { login } from "../service";
import { Link } from "react-router-dom";
import { GetUser } from "../redux/actions";

export const LogInComponent = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState();
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.id) navigate.replace("/");
  }, [user, navigate]);
  const handleSubmit = async () => {
    setloading(true);
    try {
      const res = await login(usernameOrEmail, password);
      localStorage.setItem("token", res.headers["x-auth-token"]);
      GetUser(res.data);
      setloading(false);
    } catch (error) {
      setErrors(error.response.data.split("-"));
      setloading(false);
    }
  };
  return (
    <section className="login_component">
      {loading && <i className="fas fa-futbol infinite"></i>}
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
          onKeyPress={({ key }) => {
            if (key === "Enter") handleSubmit();
          }}
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
