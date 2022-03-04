import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../service";
import { RootState } from "../store";

export interface User {
  username: string;
  email: string;
  id: string;
  account_sum: number;
}
const initialStateUser: User = {
  username: "",
  email: "",
  id: "",
  account_sum: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    setUser(state, action) {
      state.account_sum = action.payload.account_sum;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logOut(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("account_sum");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      state.account_sum = initialStateUser.account_sum;
      state.username = initialStateUser.username;
      state.id = initialStateUser.id;
      state.email = initialStateUser.email;
    },
    updateAccountSum(state, action) {
      state.account_sum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.account_sum = action.payload.account_sum;
      state.email = action.payload.email;
      state.id = action.payload.id;
      saveUserToStorage(action.payload);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.account_sum = action.payload.account_sum;
      state.email = action.payload.email;
      state.id = action.payload.id;
      saveUserToStorage(action.payload);
    });
  },
});

const saveUserToStorage = (payload: User) => {
  localStorage.setItem("user_id", payload.id);
  localStorage.setItem("username", payload.username);
  localStorage.setItem("email", payload.email);
  localStorage.setItem("account_sum", String(payload.account_sum));
};
export const {
  actions: { logOut, updateAccountSum, setUser },
  reducer: userReducer,
} = userSlice;

export const selectUser = (state: RootState) => state.user;

export const logInUser = createAsyncThunk<
  User,
  { emailOrUsername: string; password: string },
  { state: RootState }
>("user/login", async ({ emailOrUsername, password }) => {
  const res = await login(emailOrUsername, password);
  localStorage.setItem("token", res.headers["x-auth-token"]);
  return res.data;
});

export const registerUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { state: RootState }
>("user/register", async ({ username, email, password }) => {
  const res = await register(username, email, password);
  localStorage.setItem("token", res.headers["x-auth-token"]);
  return res.data;
});

export default userReducer;
