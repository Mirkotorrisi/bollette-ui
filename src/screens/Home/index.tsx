import React, { useState } from "react";
import { CHAMPIONSHIPS } from "../../consts";
import { markets } from "../../consts/markets";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Checkout } from "./Checkout";
import "./index.scss";
import { Ranking } from "./Ranking";
import { Table } from "./Table";

export const Home = () => {
  const [championship, setChampionship] = useState(CHAMPIONSHIPS.SERIE_A);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 640;
  return (
    <section className="w-full py-16 flex">
      {/* <div className="">
        <div className="flex flex-col w-full lg:w-1/2">
          <h2>AI Powered Bet Assistant</h2>
          <p>
            Place your bets effortlessly by chatting with us, just like you
            would with a real betting operator.
          </p>
        </div>
      </div> */}
      <div className="bet_component w-full grid grid-cols-12">
        <div className="flex flex-col col-span-2">
          <div className="league_buttons mb-4 lg:mb-0">
            <h2 className="mb-4 hidden lg:block league_buttons__title">
              Football leagues
            </h2>
            <div className="flex lg:flex-col overflow-scroll checkout fixed lg:relative top-[72px] lg:top-0">
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
          <Ranking />
        </div>
        <Table championship={championship} />
        <Checkout />
      </div>
    </section>
  );
};
