import React from "react";
import { markets } from "../../../../consts/entities";
import "./index.scss";
interface Props {
  market: (typeof markets)[number];
}

export const TableHead = ({ market }: Props) => (
  <thead className="bet_buttons_head">
    <tr>
      <th className="py-2">Event</th>
      <th className="py-2 bet_buttons__datetime">Date</th>
      <th className="py-2 bet_buttons__datetime">Time</th>

      {market.outcomes.map((outcome, index) => (
        <th className="py-2" key={outcome + index}>
          {outcome}
        </th>
      ))}
    </tr>
  </thead>
);
