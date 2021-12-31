import { CHAMPIONSHIPS, MARKETS } from "./../consts/index";
import { getAxiosInstance } from "./getAxiosInstance";

export const placeBet = async (
  match: number,
  odd: string,
  ticket_id?: string
) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: "/bets",
    data: {
      match,
      odd,
      ticket_id,
    },
  });

  return res;
};
export const removeBet = async (match: number, ticket_id: string) => {
  const res = await getAxiosInstance().request({
    method: "delete",
    url: "/bets",
    data: {
      match,
      ticket_id,
    },
  });
  return res;
};

export const fetchBetList = async (
  championship: CHAMPIONSHIPS,
  market: MARKETS
) => {
  const res = await getAxiosInstance().request({
    method: "get",
    url: `/championships/${championship}/${market}`,
  });

  return res.data;
};

export const submitCheckout = async (betImport: number, ticket_id: string) => {
  const res = await getAxiosInstance().request({
    method: "post",
    url: `/bets/checkout/${ticket_id}`,
    data: {
      betImport,
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
