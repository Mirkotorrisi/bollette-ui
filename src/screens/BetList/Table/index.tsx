import "./index.scss";
import React, { useState, useEffect, useCallback } from "react";
import { QuotaComponent } from "./QuotaComponent";
import { fetchBetList, Match } from "../../../service";
// import mock from "../../../assets/mock.json";
import { CHAMPIONSHIPS, MARKETS } from "../../../consts";
import { TableHead } from "./TableHead";

interface Props {
  championship: CHAMPIONSHIPS;
}
export const Table = ({ championship }: Props) => {
  const [list, setList] = useState<Match[]>();
  const [market, setMarket] = useState<MARKETS>(MARKETS.H2H);

  const updateList = useCallback(async () => {
    const res = await fetchBetList(championship, market);
    setList(res);
    // setList(mock);
  }, [market, championship]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  useEffect(() => {
    const interval = setInterval(async () => {
      updateList();
    }, 60000);
    return () => clearInterval(interval);
  }, [updateList]);

  return (
    <div className="flex flex-grow flex-col">
      <div className="table__header flex-col lg:flex-row px-8 mb-8 justify-between items-center">
        <h2 className="table__header__title mb-4">{championship}</h2>
        <div className="flex">
          <button
            className={`mr-2 px-2 table__header__button${
              market === MARKETS.TOTALS ? "--focused" : ""
            }`}
            onClick={() => setMarket(MARKETS.TOTALS)}
          >
            Over/under 2.5
          </button>
          <button
            className={`mr-2 px-2 table__header__button${
              market === MARKETS.H2H ? "--focused" : ""
            }`}
            onClick={() => setMarket(MARKETS.H2H)}
          >
            Head to head
          </button>
        </div>
      </div>
      {list?.length ? (
        <table className="bet_buttons lg:mx-8">
          <TableHead market={market} setMarket={setMarket} />
          <tbody>
            {list?.map((betQuota: Match, index: number) => (
              <QuotaComponent
                key={championship + market + index}
                betQuota={betQuota}
                matchNumber={index}
                isEven={index % 2 === 0}
                market={market}
                start={betQuota.start}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="px-8 text-lg">
          Something went wrong while fetching odds
        </h2>
      )}
    </div>
  );
};
