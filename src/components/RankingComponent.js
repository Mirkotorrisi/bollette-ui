import { useState, useEffect } from "react";
import { getRankingWins, getRankingBalance } from "../service/index";

export const RankingComponent = () => {
  const [ranking, setRanking] = useState();
  const [ranktype, setRankType] = useState("balance");
  useEffect(async () => {
    const res =
      ranktype === "balance"
        ? await getRankingBalance()
        : await getRankingWins();
    setRanking(res.data);
  }, [ranktype]);
  return (
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
                onClick={() => setRankType(i)}
              >
                {i}
              </button>
            );
          })}
        </caption>
        <thead>
          <th>username</th>
          <th>{ranktype}</th>
        </thead>
        <tbody>
          {ranking &&
            ranking?.map(({ username, account_sum, max_win }) => {
              return (
                <tr>
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
  );
};
