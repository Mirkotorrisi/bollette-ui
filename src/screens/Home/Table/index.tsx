import React, { useState } from "react";
import { CHAMPIONSHIPS, MARKETS } from "../../../consts";
import { Match } from "../../../service";
import { QuotaComponent } from "./QuotaComponent";
import { TableHead } from "./TableHead";
import { useQueryBetList } from "./hooks/useQueryBetList";
import "./index.scss";

interface Props {
  championship: CHAMPIONSHIPS;
}
export const Table = ({ championship }: Props) => {
  const [market, setMarket] = useState<MARKETS>(MARKETS.H2H);

  const list = useQueryBetList({ championship, delay: 600000 });

  return (
    <div className="flex flex-grow flex-col col-span-12 lg:col-span-7">
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
            {list?.map((match: Match, index: number) => (
              <QuotaComponent
                key={championship + market + index}
                match={match}
                isEven={index % 2 === 0}
                market={market}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
