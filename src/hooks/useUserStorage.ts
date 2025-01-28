import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/user";
import { useAppDispatch } from "../store";

export const useUserStorage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (localStorage.getItem("user_id") && !user.username) {
      const id = localStorage.getItem("user_id");
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      const account_sum = localStorage.getItem("account_sum");
      dispatch(setUser({ id, username, email, account_sum }));
    }
  }, [dispatch, user]);
};
