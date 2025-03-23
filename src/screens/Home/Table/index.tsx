import React, { useState } from "react";
import { markets } from "../../../consts/entities";
import { CHAMPIONSHIPS, MARKETS } from "../../../consts/enums";
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

  const selectedMarket = markets.find((m) => m.key === market);

  return (
    <div className="flex flex-grow flex-col col-span-12 lg:col-span-7 ">
      <div className="table__header flex-col lg:flex-row px-8 mb-8 justify-between items-center">
        <h2 className="table__header__title mb-4">{championship}</h2>
        <div className="flex gap-2">
          {markets.map(({ key, label }) => (
            <button
              className={`px-2 table__header__button${
                market === key ? "--focused" : ""
              }`}
              onClick={() => setMarket(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {list?.length ? (
        <table className="bet_buttons lg:mx-8">
          <TableHead market={selectedMarket!} />
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
