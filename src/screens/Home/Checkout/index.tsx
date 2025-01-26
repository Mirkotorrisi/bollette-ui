import React from "react";
import useCheckout from "../../../hooks/useCheckout";
import { clearTicket } from "../../../redux/tickets";
import { useAppDispatch } from "../../../store";
import CheckoutItem from "./CheckoutItem/CheckoutItem";
import "./index.scss";

const BET_IMPORTS = [2, 5, 10, 20];

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const {
    oddsChanged,
    sum,
    setSum,
    ticket,
    showTotalContainer,
    handleSubmit,
    multiplier,
    setShowTotalContainer,
  } = useCheckout();

  if (!ticket?.length) return null;

  return (
    <section
      className={`checkout__container fixed lg:static flex-col col-span-3 ${
        showTotalContainer ? "top-20" : "-bottom-1/2"
      } `}
    >
      <p className="mb-4 checkout__title hidden lg:block">Your ticket</p>
      <div className="checkout max-lg:w-screen p-8">
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
        {ticket?.map((bet, index) => (
          <CheckoutItem bet={bet} index={index} key={bet.id} />
        ))}
        <div className="flex flex-col">
          {ticket.length ? (
            <button
              className="checkout__footer__empty mb-4 mt-2"
              onClick={() => dispatch(clearTicket())}
            >
              Empty your ticket
            </button>
          ) : (
            <p>You have placed no bets yet!</p>
          )}
          {oddsChanged ? (
            <div className="odds_changed p-2">
              <p>Some odds are changed! </p>
              <p>Check your ticket and submit it again</p>
            </div>
          ) : null}

          <div className="flex mt-4">
            {BET_IMPORTS.map((number) => (
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
              <p className="checkout__multiplier mt-8 flex justify-between">
                Multiplier <span>{multiplier.toFixed(2) || 0}</span>
              </p>
              <p className="checkout__max_win flex justify-between">
                Max win <span>{(sum * multiplier).toFixed(2)} $</span>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};
