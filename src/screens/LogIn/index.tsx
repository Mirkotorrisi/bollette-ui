import "./index.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logInUser, selectUser } from "../../redux/user";
import { useAppDispatch } from "../../store";
import React from "react";

export const LogIn = () => {
  const { register, handleSubmit } = useForm();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.id) navigate("/");
  }, [user, navigate]);
  const onSubmit = async ({ emailOrUsername, password }: FieldValues) => {
    dispatch(logInUser({ emailOrUsername, password }));
  };
  return (
    <section className="login flex flex-col items-center justify-center">
      <h1 className="login__title">Log in</h1>
      <div className="flex-grow py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form flex flex-col p-8  items-center gap-4"
        >
          <label htmlFor="emailOrUsername" className="form__label">
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            placeholder="username or email"
            className="form__input px-2 py-4"
            {...register("emailOrUsername", { required: true })}
          />
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="form__input px-2 py-4"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <div className="login_buttons mt-8">
            <input className="form__submit p-4" type="submit" value="Log in" />
            <Link className="form__redirect p-4" to="/register">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
