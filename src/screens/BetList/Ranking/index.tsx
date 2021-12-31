import { useState, useEffect } from "react";
import { getRankingWins, getRankingBalance } from "../../../service";

export const Ranking = () => {
  interface Ranking {
    username: string;
    account_sum: number;
    max_win: number;
  }
  enum RANKING_TYPE {
    BALANCE = "BALANCE",
    MAX_WIN = "MAX_WIN",
  }
  const [ranking, setRanking] = useState<Ranking[] | undefined>();
  const [ranktype, setRankType] = useState(RANKING_TYPE.BALANCE);

  useEffect(() => {
    const fetchRanking = async () => {
      const res =
        ranktype === RANKING_TYPE.BALANCE
          ? await getRankingBalance()
          : await getRankingWins();
      setRanking(res.data);
    };
    fetchRanking();
  }, [ranktype, RANKING_TYPE.BALANCE]);
  return (
    <div className="ranking_container">
      <table className="bet_buttons">
        <caption className="market_type_buttons">
          {[RANKING_TYPE.BALANCE, RANKING_TYPE.MAX_WIN].map((i) => (
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
          ))}
        </caption>
        <thead>
          <tr>
            <th>username</th>
            <th>{ranktype}</th>
          </tr>
        </thead>
        <tbody>
          {ranking?.length &&
            ranking?.map(({ username, account_sum, max_win }, index) => (
              <tr key={username + index}>
                <td>{username}</td>
                <td>
                  {account_sum}
                  {max_win}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
