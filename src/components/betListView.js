import React from "react";
import { useState, useEffect } from "react";
import { QuotaComponent } from "./quotaComponent";
import Modal from "./Modal";
import { fetchBetList } from "../service/index";
import { parseDate } from "../utils/betStartParser";
export const BetListView = ({ champhionsip }) => {
  const [list, setList] = useState();
  const [market, setMarket] = useState("h2h");

  const [modal, setmodal] = useState({ show: false, content: "" });
  const updateList = async () => {
    try {
      const res = await fetchBetList(champhionsip, market);
      setList(res);
    } catch (err) {
      if (err.response) {
        setmodal({
          title: "ERROR",
          show: true,
          status: `${err.response.status}`,
          error: `${err.response.data}`,
        });
      }
    }
  };
  useEffect(() => {
    updateList();
  }, [champhionsip, market]);
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateList();
    }, 60000);
    return () => clearInterval(interval);
  });
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
      <div className="betlist_container">
        <caption className="market_type_buttons">
          <button
            className={
              market === "totals"
                ? "market_button_focused"
                : "market_buttons_button"
            }
            onClick={() => setMarket("totals")}
          >
            Over/under 2.5
          </button>
          <button
            className={
              market === "h2h"
                ? "market_button_focused"
                : "market_buttons_button"
            }
            onClick={() => setMarket("h2h")}
          >
            Final result (1,X,2)
          </button>
        </caption>
        <table className="bet_buttons">
          <thead className="bet_buttons_head">
            <tr>
              <th>Event</th>
              <th>Start</th>

              {market === "h2h" && (
                <>
                  <th>1</th>
                  <th>X</th>
                  <th>2</th>
                </>
              )}
              {market === "totals" && (
                <>
                  <th>over</th>
                  <th>under</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {list?.length > 0 &&
              list?.map((betQuota, index) => {
                return (
                  <QuotaComponent
                    key={champhionsip + market + index}
                    betQuota={betQuota}
                    matchNumber={index}
                    market={market}
                    start={parseDate(betQuota.start * 1000)}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
