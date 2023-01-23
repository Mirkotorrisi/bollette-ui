import "./index.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { submitCheckout } from "../../../service";
import { updateAccountSum } from "../../../redux/user";
import {
  selectTicket,
  clearTicket,
  removeBetFromTicket,
  updateTicketOdds,
} from "../../../redux/tickets";
import { useAppDispatch } from "../../../store";
import { parseDate } from "../../../utils/betStartParser";
import { showModal } from "../../../redux/modals";

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const { ticket, multiplier } = useSelector(selectTicket);
  const [showTotalContainer, setShowTotalContainer] = useState(false);
  const [sum, setSum] = useState(2);
  const [oddsChanged, setOddsChanged] = useState(false);
  // let ticket_id = checkout ? checkout.ticket_id : null;
  const handleSubmit = async () => {
    if (!ticket.length || !multiplier) return;
    const ticketWithoutPrevOdds = ticket.map((bet) => ({
      ...bet,
      prevOdd: undefined,
    }));
    const res = await submitCheckout(sum, ticketWithoutPrevOdds, multiplier);
    if (res.updatedTicket) {
      setOddsChanged(true);
      dispatch(updateTicketOdds(res.updatedTicket));
    }
    if (res.account_sum) {
      dispatch(clearTicket());
      dispatch(updateAccountSum(res.account_sum));
      dispatch(showModal(res));
      setOddsChanged(false);
    }
  };

  const getClassBasedOnPrevOdd = (odd: number, prevOdd?: number) => {
    if (prevOdd) return prevOdd > odd ? "decrement_odd" : "increment_odd";
    return "";
  };

  return (
    <section
      className={`checkout__container fixed lg:static flex-col ${
        showTotalContainer ? "show" : "hide"
      } ${ticket.length ? "" : "hidden lg:block"}`}
    >
      <h2 className="mb-4 checkout__title hidden lg:block">Your ticket</h2>
      <div className="checkout p-8">
        <button
          className="flex justify-between mb-4 w-full lg:hidden checkout__show-btn"
          onClick={() => setShowTotalContainer(!showTotalContainer)}
          style={{
            animation: `superglow ${ticket.length}s`,
          }}
        >
          Checkout
          <i
            className={`fas fa-${showTotalContainer ? "times" : "chevron-up"}`}
          ></i>
        </button>
        {ticket?.map(
          ({ teams, matchId, start, result, odd, prevOdd }, index) => (
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
                    <span
                      className={`checkout__item__odd ${
                        prevOdd ? "canc_odd" : ""
                      }`}
                    >
                      {prevOdd}
                    </span>
                  )}
                  <span
                    className={`checkout__item__odd ${getClassBasedOnPrevOdd(
                      odd,
                      prevOdd
                    )}`}
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
          )
        )}
        <div className="flex flex-col">
          {ticket.length ? (
            <button
              className="checkout__footer__empty mb-4 mt-2"
              onClick={() => dispatch(clearTicket())}
            >
              Empty your ticket
            </button>
          ) : (
            <h2>You have placed no bets yet!</h2>
          )}
          {oddsChanged ? (
            <div className="odds_changed p-2">
              <h2>Some odds are changed! </h2>
              <h2>Check your ticket and submit it again</h2>
            </div>
          ) : null}

          <div className="flex mt-4">
            {[2, 5, 10, 20].map((number) => (
              <button
                className={`mr-2 px-2 table__header__button${
                  sum === number ? "--focused" : ""
                }`}
                onClick={() => setSum(number)}
                key={number}
              >
                {number} $
              </button>
            ))}
          </div>
          <span className="flex">
            <input
              className="checkout__footer__input  p-4 mt-2"
              type="number"
              min="2"
              value={sum}
              onChange={(e) => setSum(+e.target.value)}
            />
            <button
              className="checkout__footer__submit flex-grow p-4 mt-2"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </span>

          {multiplier ? (
            <>
              <h3 className="checkout__multiplier mt-8 flex justify-between">
                Multiplier <span>{multiplier.toFixed(2) || 0}</span>
              </h3>
              <h3 className="checkout__max_win flex justify-between">
                Max win <span>{(sum * multiplier).toFixed(2)} $</span>
              </h3>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};
