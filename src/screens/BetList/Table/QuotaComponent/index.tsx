import React from "react";
import { MARKETS } from "../../../../consts";

import { usePlaceBet } from "../hooks/usePlaceBet";
import { BetButton } from "./BetButton";

interface Props {
  market: MARKETS;
  betQuota: { teams: string[]; odds: any };
  matchNumber: number;
  start?: string;
  isEven: boolean;
}

export const QuotaComponent = ({
  market,
  betQuota,
  matchNumber,
  start,
  isEven,
}: Props) => {
  const signs = market === MARKETS.H2H ? ["1", "X", "2"] : ["over", "under"];
  const { submitOrRemoveBet, isSelected } = usePlaceBet(
    betQuota.teams,
    matchNumber
  );
  const isLive = start?.includes("LIVE");
  return (
    <tr
      className={`bet_buttons_row${isLive ? " row_live" : ""}${
        isEven ? " even_tab" : ""
      }`}
    >
      <td className="bet_item_teams">
        {isLive && <span className="live">LIVE</span>}
        {betQuota.teams[0]} - {betQuota.teams[1]}
      </td>
      <td className="bet_item_dates">
        {start?.replace("LIVE", "")}
        {isLive && <span className="live_tick">'</span>}
      </td>
      {signs.map((sign, index) => (
        <BetButton
          sign={sign}
          index={index}
          odd={betQuota.odds[sign]}
          isSelected={isSelected(sign)}
          submitOrRemoveBet={submitOrRemoveBet}
        />
      ))}
    </tr>
  );
};
