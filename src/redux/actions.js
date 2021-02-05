import { placeBet, removeBet } from "../service";
import store from "../store";
export const GetBolletta = (matchNumber, result, ticket_id) => {
  store.dispatch({
    type: "BOLLETTA",
    payload: placeBet(matchNumber, result, ticket_id),
  });
};
export const RemoveBolletta = (matchNumber, ticket_id) => {
  store.dispatch({
    type: "BOLLETTA",
    payload: removeBet(matchNumber, ticket_id),
  });
};
export const ClearBolletta = () => {
  store.dispatch({
    type: "BOLLETTA_CLEARED",
    payload: {},
  });
};
export const GetUser = ({ username, id, email, account_sum }) => {
  store.dispatch({
    type: "USER_FULFILLED",
    payload: { username, id, email, account_sum },
  });
};
export const RemoveUser = () => {
  localStorage.setItem("token", null);
  store.dispatch({
    type: "USER_CLEARED",
  });
};
export const ModifyAccountUser = (user, newBalance) => {
  store.dispatch({
    type: "USER_ACCOUNT_UPDATED",
    payload: { ...user, account_sum: newBalance },
  });
};
