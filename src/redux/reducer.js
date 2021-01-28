const initialStateBoll = {
  fetching: false,
  fetched: false,
  data: { tickets: [] },
  error: null,
};
const initialStateUser = {
  username: "",
  email: "",
  id: "",
  account_sum: 0,
};

export const ticketReducer = (state = initialStateBoll, action) => {
  switch (action.type) {
    case "BOLLETTA_PENDING":
      return { ...state, fetching: true };
    case "BOLLETTA_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload.data,
      };
    case "BOLLETTA_REJECTED":
      return { ...state, fetching: false, error: action.payload };
    case "BOLLETTA_CLEARED":
      return { fetching: false, fetched: true, data: action.payload };
    default:
      return state;
  }
};
export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case "USER_FULFILLED":
      return action.payload;
    case "USER_CLEARED":
      return initialStateUser;
    case "USER_ACCOUNT_UPDATED":
      return action.payload;
    default:
      return state;
  }
};
