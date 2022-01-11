import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeBet, removeBet } from "../service";

export interface Bet {
  teams: string[];
  result: string;
  odd: number;
  start: number;
  won: boolean;
}
export interface Ticket {
  ticket: Bet[];
  checkout?: {
    ticket_id: number;
    multiplier: number;
  };
  isLoading?: boolean;
}

const initialStateBoll: Ticket = {
  ticket: [
    {
      teams: ["Bologna", "Inter Milan"],
      start: 1641468600,
      result: "1",
      odd: 6.25,
      won: false,
    },
  ],
  checkout: {
    ticket_id: 19808,
    multiplier: 6.25,
  },
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialStateBoll,
  reducers: {
    clearTicket(state) {
      state.checkout = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBetToTicket.fulfilled, (state, action) => {
      state.ticket = action.payload.ticket;
      state.checkout = action.payload.checkout;
    });
    builder.addCase(removeBetFromTicket.fulfilled, (state, action) => {
      state.ticket = action.payload.ticket;
      state.checkout = action.payload.checkout;
    });
  },
});
export const selectTicket = (state: RootState) => state.ticket;

export const {
  actions: { clearTicket },
  reducer: ticketReducer,
} = ticketSlice;

export default ticketReducer;

export const addBetToTicket = createAsyncThunk<
  Ticket,
  { matchNumber: number; result: string },
  { state: RootState }
>("tickets/add", async ({ matchNumber, result }, thunkAPI) => {
  const state = thunkAPI.getState();
  const ticket_id = selectTicket(state).checkout?.ticket_id;
  const response = await placeBet(matchNumber, result, ticket_id);
  return response.data;
});

export const removeBetFromTicket = createAsyncThunk<
  Ticket,
  { matchNumber: number },
  { state: RootState }
>("tickets/remove", async ({ matchNumber }, thunkAPI) => {
  const state = thunkAPI.getState();
  const ticket_id = selectTicket(state).checkout?.ticket_id;
  const response = await removeBet(matchNumber, ticket_id!);
  return response.data;
});
