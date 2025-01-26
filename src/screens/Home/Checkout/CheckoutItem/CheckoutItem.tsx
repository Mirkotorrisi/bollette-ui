import React from "react";
import { Bet, removeBetFromTicket } from "../../../../redux/tickets";
import { useAppDispatch } from "../../../../store";
import { parseDate } from "../../../../utils/betStartParser";

type Props = {
  bet: Bet;
  index: number;
};
const CheckoutItem = ({ bet, index }: Props) => {
  const { matchId, teams, start, result, odd, prevOdd } = bet;
  const dispatch = useAppDispatch();
  return (
    <div className="checkout__item flex justify-between" key={index}>
      <div className="checkout__item__match flex flex-col">
        <span>
          {teams[0]}-{teams[1]}
        </span>
        <i className="checkout__item__dates">{parseDate(start)}</i>
      </div>
      <div className="flex text-right">
        <div className="flex flex-col justify-between mx-4">
          <span className="checkout__item__result ">{result}</span>
          {prevOdd && (
            <span className="checkout__item__odd canc_odd">{prevOdd}</span>
          )}
          <span
            className={`checkout__item__odd ${
              prevOdd && prevOdd > odd ? "decrement_odd" : "increment_odd"
            }`}
          >
            {odd}
          </span>
        </div>
        <button
          className="checkout__item__del"
          onClick={() => {
            dispatch(removeBetFromTicket({ matchId }));
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
