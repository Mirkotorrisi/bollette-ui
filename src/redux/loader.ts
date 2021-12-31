import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

interface Loader {
  show: boolean;
}

const initialStateLoader: Loader = {
  show: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialStateLoader,
  reducers: {
    showLoader(state) {
      state.show = true;
    },
    hideLoader(state) {
      state.show = false;
    },
  },
});
export const selectLoader = (state: RootState) => state.loader;

export const {
  actions: { showLoader, hideLoader },
  reducer: loaderReducer,
} = loaderSlice;

export default loaderReducer;
