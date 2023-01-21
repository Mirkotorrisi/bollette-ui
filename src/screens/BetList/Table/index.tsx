import "./index.scss";
import React, { useState, useEffect, useCallback } from "react";
import { QuotaComponent } from "./QuotaComponent";
import { fetchBetList, Match } from "../../../service";
import mock from "../../../assets/mock.js";
import { CHAMPIONSHIPS, MARKETS } from "../../../consts";
import { TableHead } from "./TableHead";
import { useQueryBetList } from "./hooks/useQueryBetList";

interface Props {
  championship: CHAMPIONSHIPS;
}
export const Table = ({ championship }: Props) => {
  const [market, setMarket] = useState<MARKETS>(MARKETS.H2H);

  const list = useQueryBetList({ market, championship, delay: 60000 });

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
          <TableHead market={market} />
          <tbody>
            {list?.map((betQuota: Match, index: number) => (
              <QuotaComponent
                key={championship + market + index}
                betQuota={betQuota}
                isEven={index % 2 === 0}
                market={market}
                start={betQuota.start}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
