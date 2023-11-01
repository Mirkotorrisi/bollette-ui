import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { registerUser, selectUser } from "../../redux/user";
import { useAppDispatch } from "../../store";
import {
  emailDomain,
  password,
  repeatPassword,
  username,
} from "../../utils/fieldValidators";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) navigate("/");
  }, [user, navigate]);

  const onSubmit = async ({ username, email, password }: FieldValues) => {
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <section className="login flex-1 flex flex-col items-center justify-center">
      <h1 className="login__title">Register</h1>
      <div className="py-16 ">
        <form
          className="form flex flex-col p-10 items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="form__input px-2 py-4"
            {...register("username", { required: true, ...username() })}
            placeholder="username"
          />
          <span>{errors?.username?.message as string}</span>
          <input
            className="form__input px-2 py-4"
            {...register("email", { required: true, ...emailDomain() })}
            placeholder="email"
            type="email"
          />
          <span>{errors?.email?.message as string}</span>

          <input
            className="form__input px-2 py-4"
            type="password"
            {...register("password", { required: true, ...password() })}
            placeholder="password"
          />
          <span>{errors?.password?.message as string}</span>

          <input
            className="form__input px-2 py-4"
            type="password"
            placeholder="repeat password"
            {...register("repeatPassword", {
              required: true,
              ...repeatPassword(watch("password")),
            })}
          />
          <span>{errors?.repeatPassword?.message as string}</span>

          <div className="login__buttons ">
            <input
              type="submit"
              className="form__submit p-4"
              value="Register"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
