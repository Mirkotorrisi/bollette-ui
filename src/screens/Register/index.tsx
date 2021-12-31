import "./index.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
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
  const history = useHistory();

  useEffect(() => {
    if (user.id) history.replace("/");
  }, [user, history]);

  const onSubmit = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <section className="login_component">
      <h1 className="login_title">Register</h1>
      <div className="login_component_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="emailOrUsername"
            {...register("username", { required: true, ...username() })}
            placeholder="username"
          />
          <span>{errors?.username?.message}</span>
          <input
            className="emailOrUsername"
            {...register("email", { required: true, ...emailDomain() })}
            placeholder="email"
            type="email"
          />
          <span>{errors?.email?.message}</span>

          <input
            className="password"
            type="password"
            {...register("password", { required: true, ...password() })}
            placeholder="password"
          />
          <span>{errors?.password?.message}</span>

          <input
            className="password"
            type="password"
            placeholder="repeat password"
            {...register("repeatPassword", {
              required: true,
              ...repeatPassword(watch("password")),
            })}
          />
          <span>{errors?.repeatPassword?.message}</span>

          <div className="login_buttons">
            <input type="submit" className="login_submit" value="Register" />
          </div>
        </form>
      </div>
    </section>
  );
};
