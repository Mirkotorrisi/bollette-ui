import React from "react";
import { CHAMPIONSHIPS } from "../../../consts";

type Props = {
  markets: {
    key: CHAMPIONSHIPS;
    label: string;
    flag: string;
  }[];
  setChampionship: React.Dispatch<React.SetStateAction<CHAMPIONSHIPS>>;
  championship: string;
};

const LeagueMenu = ({ markets, setChampionship, championship }: Props) => {
  return (
    <div className="w-screen league_buttons mb-4 lg:mb-0 sticky top-16 lg:top-0">
      <h2 className="mb-4 hidden lg:block league_buttons__title">
        Football leagues
      </h2>
      <div className="w-full flex lg:flex-col overflow-scroll checkout  lg:relative ">
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
  );
};

export default LeagueMenu;
