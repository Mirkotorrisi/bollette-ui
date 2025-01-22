import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

export interface Bet {
  id: string;
  matchId: string;
  teams: string[];
  result: string;
  odd: number;
  start: string;
  won?: boolean;
  prevOdd?: number;
}
export interface Ticket {
  ticket: Bet[];
  multiplier?: number;

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
      state.multiplier = undefined;
      state.ticket = [];
    },
    addBetToTicket(state, action) {
      const { odds, ...match } = action.payload.match;
      const oddRes = action.payload.result;
      const bet = { result: oddRes, odd: odds[oddRes], ...match };
      const filtered = state.ticket.filter(
        (bet) => bet.matchId !== action.payload.match.matchId
      );

      state.ticket = [...filtered, bet];
      state.multiplier = [...filtered, bet].reduce(
        (acc, match) => (acc *= match.odd),
        1
      );
    },
    removeBetFromTicket(state, action) {
      const filtered = state.ticket.filter(
        (bet) => bet.matchId !== action.payload.matchId
      );
      state.ticket = filtered;
      state.multiplier = filtered?.length
        ? filtered.reduce((acc, match) => (acc *= match.odd), 1)
        : 0;
    },
    updateTicketOdds(state, action) {
      const newTicket = state.ticket.map((bet) => {
        const updatedBet = action.payload.find(
          (b: Bet) => b.matchId === bet.matchId
        );
        return updatedBet ?? bet;
      });
      state.ticket = newTicket;
      state.multiplier = newTicket.reduce(
        (acc, match) => (acc *= match.odd),
        1
      );
    },
    setWholeTicket(state, action) {
      state.ticket = action.payload;
      state.multiplier = action.payload.reduce(
        (acc: number, match: Bet) => (acc *= match.odd),
        1
      );
    },
  },
});
export const selectTicket = (state: RootState) => state.ticket;

export const {
  actions: {
    clearTicket,
    addBetToTicket,
    removeBetFromTicket,
    updateTicketOdds,
    setWholeTicket,
  },
  reducer: ticketReducer,
} = ticketSlice;

export default ticketReducer;
