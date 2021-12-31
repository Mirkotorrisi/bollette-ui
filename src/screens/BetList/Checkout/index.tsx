import React, { useState } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { submitCheckout } from "../../../service";
import { updateAccountSum } from "../../../redux/user";
import {
  selectTicket,
  clearTicket,
  removeBetFromTicket,
} from "../../../redux/tickets";
import { useAppDispatch } from "../../../store";

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const { ticket, checkout } = useSelector(selectTicket);
  const { width, isSmallScreen } = useWindowDimensions();
  const [showTotalContainer, setShowTotalContainer] = useState(false);
  const [sum, setSum] = useState(2);
  let ticket_id = checkout ? checkout.ticket_id : null;
  const handleSubmit = async () => {
    const res = await submitCheckout(sum, ticket_id!);
    dispatch(clearTicket());
    dispatch(updateAccountSum(res.account_sum));
  };
  return (
    <>
      {ticket.length ? (
        <div
          className="total_container"
          style={width < 720 ? (showTotalContainer ? {} : { height: 25 }) : {}}
        >
          {isSmallScreen && (
            <button
              className="show_total_container_btn"
              onClick={() => setShowTotalContainer(!showTotalContainer)}
              style={{
                animation: `superglow ${ticket.length}s`,
              }}
            >
              Checkout
            </button>
          )}
          {ticket_id &&
            ticket?.map((bet, index) => (
              <div
                className="total_item"
                key={bet.teams[0] + "-" + bet.teams[1]}
              >
                <div className="total_item_match">
                  <span>
                    {bet.teams[0]}-{bet.teams[1]}
                  </span>
                  <i className="bet_item_dates">
                    {new Date(+bet.start * 1000).toString().slice(0, 21)}
                  </i>
                </div>
                <span className="result">{bet.result}</span>
                <span className="odd">{bet.odd}</span>
                <button
                  className="del_button"
                  onClick={() => {
                    dispatch(removeBetFromTicket({ matchNumber: index }));
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          <div className="checkout">
            {ticket.length && (
              <button onClick={() => dispatch(clearTicket())}>
                Empty your ticket
              </button>
            )}

            <h3 className="bet_mutliplier">
              MULTIPLIER :{checkout?.multiplier.toFixed(2)}
            </h3>

            {checkout?.multiplier && (
              <h3 className="max_win">
                Max win : {(sum * checkout?.multiplier).toFixed(2)} $
              </h3>
            )}
            <span className="input_section">
              <input
                className="input_number"
                type="number"
                min="2"
                value={sum}
                onChange={(e) => setSum(+e.target.value)}
              />
              <button
                className="place_bet_button"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
