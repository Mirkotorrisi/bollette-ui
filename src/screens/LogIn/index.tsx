import "./index.scss";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logInUser, selectUser } from "../../redux/user";
import { useAppDispatch } from "../../store";

export const LogIn = () => {
  const { register, handleSubmit } = useForm();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.id) history.replace("/");
  }, [user, history]);
  const onSubmit = async ({
    emailOrUsername,
    password,
  }: {
    emailOrUsername: string;
    password: string;
  }) => {
    dispatch(logInUser({ emailOrUsername, password }));
  };
  return (
    <section className="login_component">
      <h1 className="login_title">Log in</h1>
      <div className="login_component_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            id="emailOrUsername"
            placeholder="username or email"
            {...register("emailOrUsername", { required: true })}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="password"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <div className="login_buttons">
            <input className="login_submit" type="submit" value="Log in" />
            <Link className="register_link" to="/register">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
