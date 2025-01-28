import { MARKETS } from "../../../../consts/enums";
import "./index.scss";

import React from "react";
import { Match, SIGN } from "../../../../service";
import { useParseDate } from "../hooks/useParseDate";
import { usePlaceBet } from "../hooks/usePlaceBet";
import { BetButton } from "./BetButton";

interface Props {
  market: MARKETS;
  match: Match;
  isEven: boolean;
}

export const QuotaComponent = ({ market, match, isEven }: Props) => {
  const signs =
    market === MARKETS.H2H
      ? [SIGN.HOME, SIGN.DRAW, SIGN.VISITOR]
      : [SIGN.OVER, SIGN.UNDER];
  const { submitOrRemoveBet, isSelected } = usePlaceBet(match);
  const { date, time, isLive } = useParseDate(match.start);
  return (
    <tr
      className={` bet_buttons_row${isLive ? " row_live" : ""}${
        isEven ? " even_tab" : ""
      }`}
    >
      <td className="pl-4 py-4 bet_item__teams flex flex-col lg:flex-row">
        <span>{match.teams[0]}</span>
        <span className="hidden lg:block"> - </span>
        <span>{match.teams[1]}</span>
        {isLive && (
          <span className="live px-2 lg:ml-3 flex items-center">
            Live<i className="fas fa-circle ml-2"></i>
          </span>
        )}
        <p className="block lg:hidden bet_item__teams__date">
          {date} {time} {isLive && <span className="live_tick">'</span>}
        </p>
      </td>
      <td className="text-center bet_item__dates bet_buttons__datetime">
        {date}
      </td>
      <td className="text-center bet_item__dates bet_buttons__datetime">
        {isLive && <span className="live_tick">'</span>}
        {time}
      </td>
      {signs.map((sign, index) => (
        <BetButton
          key={sign + index}
          sign={sign}
          index={index}
          odd={match.odds[sign]}
          isSelected={isSelected(sign)}
          submitOrRemoveBet={submitOrRemoveBet}
        />
      ))}
    </tr>
  );
};
