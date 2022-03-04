import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

interface Modal {
  show: boolean;
  title?: string;
  maxWin?: number;
  ticket_id?: string;
  account_sum?: number;
  error?: string;
  status?: number;
}

const initialStateModal: Modal = {
  show: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialStateModal,
  reducers: {
    showModal(state, action) {
      state.show = true;
      state.error = action.payload.error;
      state.status = action.payload.status;
      state.account_sum = action.payload.account_sum;
      state.maxWin = action.payload.maxWin;
      state.ticket_id = action.payload.ticket_id;
      state.title = action.payload.title;
    },
    hideModal(state) {
      state.show = false;
    },
  },
});
export const selectModal = (state: RootState) => state.modal;

export const {
  actions: { showModal, hideModal },
  reducer: modalReducer,
} = modalSlice;

export default modalReducer;
