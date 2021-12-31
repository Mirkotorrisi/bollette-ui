import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./redux/tickets";
import userReducer from "./redux/user";
import loaderReducer from "./redux/loader";
import { useDispatch } from "react-redux";
import modalReducer from "./redux/modals";

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    user: userReducer,
    modal: modalReducer,
    loader: loaderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
