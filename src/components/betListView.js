import React from "react";
import { useState, useEffect } from "react";
import { QuotaComponent } from "./quotaComponent";
import Modal from "./Modal";
import { fetchBetList } from "../service/index";
import { parseDate } from "../utils/betStartParser";
export const BetListView = ({ marketName }) => {
  const [list, setList] = useState();
  const [modal, setmodal] = useState({ show: false, content: "" });
  const updateList = async () => {
    try {
      const res = await fetchBetList(marketName);
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
  }, [marketName]);
  useEffect(() => {
    const interval = setInterval(async () => {
      await updateList();
    }, 60000);
    return () => clearInterval(interval);
  });
  return (
    <>
      {" "}
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
        <table className="bet_buttons">
          <thead className="bet_buttons_head">
            <tr>
              <th>Event</th>
              <th>Start</th>
              <th>1</th>
              <th>X</th>
              <th>2</th>
            </tr>
          </thead>
          <tbody>
            {list?.length > 0 &&
              list?.map((betQuota, index) => {
                return (
                  <QuotaComponent
                    key={marketName + index}
                    betQuota={betQuota}
                    matchNumber={index}
                    marketName={marketName}
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
