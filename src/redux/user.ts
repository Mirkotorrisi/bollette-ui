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
      state = action.payload;
    },
    logOut(state) {
      localStorage.removeItem("token");
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
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.account_sum = action.payload.account_sum;
      state.email = action.payload.email;
      state.id = action.payload.id;
    });
  },
});

export const {
  actions: { logOut, updateAccountSum },
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
