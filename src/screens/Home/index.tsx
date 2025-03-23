import React, { useState } from "react";
import { leagues } from "../../consts/entities";
import { CHAMPIONSHIPS } from "../../consts/enums";
import BetAssistant from "./BetAssistant/BetAssistant";
import { Checkout } from "./Checkout";
import "./index.scss";
import LeagueMenu from "./LeagueMenu/LeagueMenu";
import { Ranking } from "./Ranking";
import { Table } from "./Table";

export const Home = () => {
  const [championship, setChampionship] = useState(
    CHAMPIONSHIPS.PREMIER_LEAGUE
  );

  return (
    <section className="w-full py-16 flex">
      <div className="bet_component w-full grid grid-cols-12 relative">
        <BetAssistant />
        <div className="flex flex-col col-span-2 w-full lg:w-auto relative">
          <LeagueMenu
            leagues={leagues}
            setChampionship={setChampionship}
            championship={championship}
          />
          <Ranking />
        </div>
        <Table championship={championship} />
        <Checkout />
      </div>
    </section>
  );
};
