import axios from "axios";
import { rootUrl } from "../assets/res.json";

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error)
    if (error.response.status === 401) {
      localStorage.setItem("token", null);
    }
    return Promise.reject(error);
  }
);
export const placeBet = async (match, odd, ticket_id) => {
  const res = await axios({
    method: "post",
    url: rootUrl + "bets",
    data: {
      match,
      odd,
      ticket_id,
    },
  }).catch(({ response }) => {
    return response ? response : "error";
  });
  return res;
};
export const removeBet = async (match, ticket_id) => {
  const res = await axios({
    method: "delete",
    url: rootUrl + "bets/",
    data: {
      match,
      ticket_id,
    },
  });
  return res;
};

export const fetchBetList = async (championship, market) => {
  const res = await axios.get(
    rootUrl + "championships/" + championship + "/" + market
  );

  return res.data;
};

export const submitCheckout = async (betImport, ticket_id) => {
  const res = await axiosInstance({
    method: "post",
    url: rootUrl + "bets/checkout/" + ticket_id,
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
    data: {
      betImport,
    },
  });
  return res.data;
};
export const spinSlot = async (betImport, numOfWheels, numOfSymbols) => {
  const res = await axiosInstance({
    method: "post",
    url: rootUrl + "slot",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
    data: {
      betImport,
      numOfWheels, 
      numOfSymbols
    },
  });
  return res.data;
};
export const login = async (usernameOrEmail, password) => {
  const res = await axios({
    method: "post",
    url: rootUrl + "users/login",
    data: {
      usernameOrEmail,
      password,
    },
  });
  return res;
};
export const register = async (username, email, password) => {
  const res = await axios({
    method: "post",
    url: rootUrl + "users/register",
    data: {
      username,
      email,
      password,
    },
  });
  return res;
};
export const getTickets = async () => {
  const res = await axiosInstance({
    method: "get",
    url: rootUrl + "users/tickets",
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res;
};
export const getAccountSum = async (token) => {
  const res = await axiosInstance({
    method: "get",
    url: rootUrl + "users/account_sum",
    headers: {
      "x-auth-token": token,
    },
  });
  return res;
};
export const getRankingWins = async () => {
  const res = await axiosInstance({
    method: "get",
    url: rootUrl + "ranking/maxwins",
  });
  return res;
};
export const getRankingBalance = async () => {
  const res = await axiosInstance({
    method: "get",
    url: rootUrl + "ranking/",
  });
  return res;
};
