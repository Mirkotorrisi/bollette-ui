import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeBet, removeBet } from "../service";

export interface Bet {
  matchId: string;
  teams: string[];
  result: string;
  odd: number;
  start: string;
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
  ticket: [],
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
  { matchId: string; result: string },
  { state: RootState }
>("tickets/add", async ({ matchId, result }, thunkAPI) => {
  const state = thunkAPI.getState();
  const ticket_id = selectTicket(state).checkout?.ticket_id;
  const response = await placeBet(matchId, result, ticket_id);
  return response.data;
});

export const removeBetFromTicket = createAsyncThunk<
  Ticket,
  { matchId: string },
  { state: RootState }
>("tickets/remove", async ({ matchId }, thunkAPI) => {
  const state = thunkAPI.getState();
  const ticket_id = selectTicket(state).checkout?.ticket_id;
  const response = await removeBet(matchId, ticket_id!);
  return response.data;
});
