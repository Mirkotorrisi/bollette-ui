import { useState, useEffect } from "react";
import { getRankingWins, getRankingBalance } from "../service/index";
import Modal from "./Modal";
export const RankingComponent = () => {
  const [ranking, setRanking] = useState();
  const [ranktype, setRankType] = useState("balance");
  const [modal, setmodal] = useState({ show: false, content: "" });

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res =
          ranktype === "balance"
            ? await getRankingBalance()
            : await getRankingWins();
        setRanking(res.data);
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
    fetchRanking();
  }, [ranktype]);
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
      <div className="ranking_container">
        <table className="bet_buttons">
          <caption className="market_type_buttons">
            {["balance", "max win"].map((i) => {
              return (
                <button
                  className={
                    ranktype === i
                      ? "market_button_focused"
                      : "market_buttons_button"
                  }
                  style={{ display: "inline", width: 80 }}
                  onClick={() => setRankType(i)}
                >
                  {i}
                </button>
              );
            })}
          </caption>
          <thead>
            <tr>
              <th>username</th>
              <th>{ranktype}</th>
            </tr>
          </thead>
          <tbody>
            {ranking &&
              ranking?.map(({ username, account_sum, max_win }, index) => {
                return (
                  <tr key={username + index}>
                    <td>{username}</td>
                    <td>
                      {account_sum}
                      {max_win}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
