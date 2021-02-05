import React from "react";
import { useSelector } from "react-redux";

import { RemoveBolletta, GetBolletta } from "../redux/actions";
export const QuotaComponent = ({ market, betQuota, matchNumber, start }) => {
  const data = useSelector((state) => state.ticketReducer.data);
  const ticketSelected = data.ticket?.find(
    ({ teams }) =>
      teams[0] === betQuota.teams[0] && teams[1] === betQuota.teams[1]
  );
  const submitOrRemoveBet = (sign) => {
    if (ticketSelected) {
      if (ticketSelected.result === sign) {
        RemoveBolletta(
          data.ticket.indexOf(ticketSelected),
          data.checkout?.ticket_id
        );
      } else {
        GetBolletta(matchNumber, sign, data.checkout?.ticket_id);
      }
    } else {
      GetBolletta(matchNumber, sign, data.checkout?.ticket_id);
    }
  };

  return (
    <tr
      className={
        "bet_buttons_row" + (start.includes("LIVE") ? " row_live" : "")
      }
    >
      <td className="bet_item_teams">
        {start.includes("LIVE") && <span className="live">LIVE</span>}
        {betQuota.teams[0]} -{betQuota.teams[1]}
      </td>
      <td className="bet_item_dates">
        {start.replace("LIVE", "")}{" "}
        {start.includes("LIVE") && <span className="live_tick">'</span>}
      </td>
      {market === "h2h"
        ? ["1", "X", "2"].map((sign, index) => (
            <td id={`${sign}-${index}`} key={`${sign}-${index}`}>
              {betQuota.odds[sign] ? (
                <button
                  className={
                    ticketSelected?.result === sign
                      ? "button_odd_clicked"
                      : "button_odd"
                  }
                  onClick={() => {
                    submitOrRemoveBet(sign);
                  }}
                >
                  {betQuota.odds[sign]}
                </button>
              ) : (
                <i className="fas fa-futbol infinite"></i>
              )}
            </td>
          ))
        : ["over", "under"].map((sign, index) => (
            <td id={`${sign}-${index}`}>
              {betQuota.odds[sign] ? (
                <button
                  className={
                    ticketSelected?.result === sign
                      ? "button_odd_clicked"
                      : "button_odd"
                  }
                  onClick={() => {
                    submitOrRemoveBet(sign);
                  }}
                >
                  {betQuota.odds[sign]}
                </button>
              ) : (
                <i className="fas fa-futbol infinite"></i>
              )}
            </td>
          ))}
    </tr>
  );
};
