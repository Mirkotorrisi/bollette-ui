import "./index.scss";
import React, { useState } from "react";
import { Table } from "./Table";
import { Checkout } from "./Checkout";
import { Ranking } from "./Ranking";
import { markets } from "../../consts/markets";
import { CHAMPIONSHIPS } from "../../consts";
import useWindowDimensions from "../../utils/useWindowDimensions";

export const BetList = () => {
  const [championship, setChampionship] = useState(CHAMPIONSHIPS.SERIE_A);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 640;
  return (
    <section className="py-16">
      <div className="bet_component flex flex-wrap">
        <div className="flex flex-col ">
          <div className="league_buttons mb-4 lg:mb-0">
            <h2 className="mb-4 hidden lg:block league_buttons__title">
              Football leagues
            </h2>
            <div className="flex lg:flex-col overflow-scroll checkout">
              {markets.map(({ key, label, flag }) => (
                <button
                  id={key}
                  key={key}
                  className={`${flag} p-3 flex justify-between league_button${
                    key === championship ? "--focused" : ""
                  }`}
                  onClick={() => setChampionship(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {!isSmallScreen && <Ranking />}
        </div>
        <Table championship={championship} />
        <Checkout />
        {isSmallScreen && <Ranking />}
      </div>
    </section>
  );
};
