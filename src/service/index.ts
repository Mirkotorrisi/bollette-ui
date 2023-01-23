import { Bet } from "../redux/tickets";
import { CHAMPIONSHIPS } from "./../consts/index";
import { getAxiosInstance } from "./getAxiosInstance";

export const placeBet = async (
  matchId: string,
  result: string,
  ticket_id?: number
) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: "/bets",
    data: {
      matchId,
      result,
      ticket_id,
    },
  });

  return res;
};
export const removeBet = async (matchId: string, ticket_id: number) => {
  const res = await getAxiosInstance().request({
    method: "delete",
    url: "/bets",
    data: {
      matchId,
      ticket_id,
    },
  });
  return res;
};

export enum SIGN {
  HOME = "home",
  VISITOR = "away",
  DRAW = "draw",
  OVER = "over",
  UNDER = "under",
}

export type Odds = {
  [key in SIGN]?: number;
};
export interface Match {
  id: string;
  matchId: string;
  teams: string[];
  start: string;
  odds: Odds;
}

export const fetchBetList = async (
  championship: CHAMPIONSHIPS
): Promise<Match[]> => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/championships/${championship}`,
  });

  return res.data;
};

export const submitCheckout = async (
  betImport: number,
  ticket: Bet[],
  multiplier: number
) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: `/bets/checkout`,
    data: {
      betImport,
      ticket,
      multiplier,
    },
  });
  return res.data;
};

export const spinSlot = async (
  betImport: number,
  numOfWheels: number,
  numOfSymbols: number
) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: `/slot`,
    data: {
      betImport,
      numOfWheels,
      numOfSymbols,
    },
  });
  return res.data;
};

export const login = async (usernameOrEmail: string, password: string) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: `/users/login`,
    data: {
      usernameOrEmail,
      password,
    },
  });
  return res;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: `/users/register`,
    data: {
      username,
      email,
      password,
    },
  });
  return res;
};

export const getTickets = async () => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/users/tickets`,
  });
  return res;
};

export const getAccountSum = async () => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/users/account_sum`,
  });
  return res;
};

export const getRankingWins = async () => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/ranking/maxwins`,
  });
  return res;
};

export const getRankingBalance = async () => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/ranking/`,
  });
  return res;
};
