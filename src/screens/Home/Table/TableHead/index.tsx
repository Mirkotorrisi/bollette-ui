import React from "react";
import { MARKETS } from "../../../../consts/enums";
import "./index.scss";
interface Props {
  market: MARKETS;
}

export const TableHead = ({ market }: Props) => (
  <thead className="bet_buttons_head">
    <tr>
      <th className="py-2">Event</th>
      <th className="py-2 bet_buttons__datetime">Date</th>
      <th className="py-2 bet_buttons__datetime">Time</th>

      {market === MARKETS.H2H && (
        <>
          <th className="py-2">1</th>
          <th className="py-2">X</th>
          <th className="py-2">2</th>
        </>
      )}
      {market === MARKETS.TOTALS && (
        <>
          <th className="py-2">over</th>
          <th className="py-2">under</th>
        </>
      )}
    </tr>
  </thead>
);
