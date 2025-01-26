import React, { useState } from "react";
import { Loader } from "../../components/Loader";
import { CHAMPIONSHIPS } from "../../consts";
import { markets } from "../../consts/markets";
import useBetAssistant from "../../hooks/useBetAssistant";
import { Checkout } from "./Checkout";
import "./index.scss";
import LeagueMenu from "./LeagueMenu/LeagueMenu";
import { Ranking } from "./Ranking";
import { Table } from "./Table";

export const Home = () => {
  const [championship, setChampionship] = useState(CHAMPIONSHIPS.SERIE_A);

  const { handleChange, handleSubmit, handleEnter, message, input, isLoading } =
    useBetAssistant();

  return (
    <section className="w-full py-16 flex">
      <div className="bet_component w-full grid grid-cols-12 relative">
        <div className="col-span-12 px-2 my-20 flex flex-col items-start gap-2 ">
          <h2 className="text-4xl warning">AI Powered Bet Assistant</h2>
          <p>
            Place your bets effortlessly by chatting with us, just like you
            would with a real betting operator.
          </p>
          <input
            type="text"
            placeholder="Place your bet here..."
            className="border px-4 py-2 rounded-lg mt-4 w-full max-w-lg"
            onKeyUp={(e) => handleEnter(e)}
            value={input}
            onChange={handleChange}
          />
          <div className="flex gap-4 items-center">
            <button
              className="checkout__footer__submit rounded px-2 py-1"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {isLoading && <Loader isSmall />}
          </div>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>
        <div className="flex flex-col col-span-2 w-full lg:w-auto">
          <LeagueMenu
            markets={markets}
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
