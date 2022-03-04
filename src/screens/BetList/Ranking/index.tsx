import React, { useState, useEffect } from "react";
import { getRankingWins, getRankingBalance } from "../../../service";
import "./index.scss";

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
    <div className="ranking mt-16 mx-auto lg:mx-0 order-8 lg:order-1">
      <h2 className="ranking__title">Users ranking</h2>
      <table className="bet_buttons">
        <caption className="my-4">
          {[RANKING_TYPE.BALANCE, RANKING_TYPE.MAX_WIN].map((i) => (
            <button
              className={`mr-2 px-2 table__header__button${
                ranktype === i ? "--focused" : ""
              }`}
              onClick={() => setRankType(i)}
              key={i}
            >
              {i}
            </button>
          ))}
        </caption>
        <thead>
          <tr>
            <th className="p-2 px-4">username</th>
            <th className="p-2 px-4">{ranktype}</th>
          </tr>
        </thead>
        <tbody>
          {ranking?.length &&
            ranking?.map(({ username, account_sum, max_win }, index) => (
              <tr key={username + index}>
                <td className="px-4">{username}</td>
                <td className="px-4">
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
