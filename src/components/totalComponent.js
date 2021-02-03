import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import useWindowDimensions from "../utils/useWindowDimensions";

import {
  RemoveBolletta,
  ClearBolletta,
  ModifyAccountUser,
} from "../redux/actions";
import { submitCheckout } from "../service";

export const TotalComponent = () => {
  const user = useSelector((state) => state.userReducer);
  const { height, width } = useWindowDimensions();
  const [showTotalContainer, setShowTotalContainer] = useState(false);
  const data = useSelector((state) => state.ticketReducer.data);
  let ticket_id = data.checkout ? data.checkout.ticket_id : null;
  const [sum, setSum] = useState(2);
  const [modal, setmodal] = useState({ show: false, content: "" });
  const handleSubmit = async () => {
    try {
      const res = await submitCheckout(sum, ticket_id);
      emptyTicket();
      setmodal({
        show: true,
        title: "BET PLACED",
        maxwin: `${res.maxWin}`,
        ticketId: `${res.ticket_id}`,
        account_sum: `${res.account_sum}`,
      });
      ModifyAccountUser(user, res.account_sum);
    } catch (err) {
      if (err.response)
        setmodal({
          title: "ERROR",
          show: true,
          status: `${err.response.status}`,
          error: `${err.response.data}`,
        });
    }
  };
  const emptyTicket = () => {
    ClearBolletta();
  };
  return (
    <>
      <Modal
        title={modal.title}
        displayModal={modal.show}
        maxwin={modal.maxwin}
        ticketId={modal.ticketId}
        account_sum={modal.account_sum}
        error={modal.error}
        status={modal.status}
        closeModal={() => setmodal({ show: false })}
      />

      <div
        className="total_container"
        style={width < 720 ? (showTotalContainer ? {} : { height: 25 }) : {}}
      >
        {width < 960 && (
          <button
            className="show_total_container_btn"
            onClick={() => setShowTotalContainer(!showTotalContainer)}
            style={{
              animation: `superglow ${data.ticket?.length}s`,
            }}
          >
            Checkout
          </button>
        )}
        {data.ticket?.map((bet, index) => {
          return (
            <div className="total_item" key={bet.teams[0] + "-" + bet.teams[1]}>
              <div className="total_item_match">
                <span>
                  {bet.teams[0]}-{bet.teams[1]}
                </span>
                <i className="bet_item_dates">
                  {new Date(bet.start * 1000).toString().slice(0, 21)}
                </i>
              </div>
              <span className="result">{bet.result}</span>
              <span className="odd">{bet.odd}</span>
              <button
                className="del_button"
                onClick={() => {
                  RemoveBolletta(index, ticket_id);
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          );
        })}
        <div className="checkout">
          {data.ticket && (
            <button onClick={() => emptyTicket()}>Empty your ticket</button>
          )}

          <h3 className="bet_mutliplier">
            MULTIPLIER :{data.checkout?.multiplier.toFixed(2)}
          </h3>

          {data.checkout?.multiplier > 0 && (
            <h3 className="max_win">
              Max win : {(sum * data.checkout?.multiplier).toFixed(2)} $
            </h3>
          )}
          <span className="input_section">
            <input
              className="input_number"
              type="number"
              min="2"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
            <button className="place_bet_button" onClick={() => handleSubmit()}>
              Submit
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
