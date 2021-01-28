import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { GetUser } from "../redux/actions";
import { register } from "../service/";

export const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const history = useHistory();
  useEffect(() => {
    if (user.id) history.replace("/");
  }, [user]);
  const handleSubmit = async () => {
    if (password === repeatPassword) {
      try {
        const res = await register(username, email, password);
        localStorage.setItem("token", res.headers["x-auth-token"]);
        GetUser(res.data);
      } catch ({ response }) {
        setErrors(response.data.split("-"));
      }
    } else setErrors(["password mismatch"]);
  };

  return (
    <section className="login_component">
      <h1 className="login_title">Register</h1>
      <div className="login_component_container">
        <input
          className="emailOrUsername"
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setErrors()}
          required
          placeholder="username"
        />
        <input
          className="emailOrUsername"
          onFocus={() => setErrors()}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          required
        />
        <input
          className="password"
          type="password"
          onFocus={() => setErrors()}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          pattern="^\S{6,}$^\w+$"
          required
        />
        <input
          className="password"
          type="password"
          pattern="^\S{6,}$^\w+$"
          onFocus={() => setErrors()}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder=" repeat password"
          required
        />
        <div className="login_buttons">
          <button className="login_submit" onClick={handleSubmit}>
            Register
          </button>
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
