import { MARKETS } from "../../../../consts";

interface Props {
  market: MARKETS;
  setMarket: (market: MARKETS) => void;
}

export const TableHead = ({ market, setMarket }: Props) => (
  <>
    <caption className="market_type_buttons">
      <button
        className={
          market === MARKETS.TOTALS
            ? "market_button_focused"
            : "market_buttons_button"
        }
        onClick={() => setMarket(MARKETS.TOTALS)}
      >
        Over/under 2.5
      </button>
      <button
        className={
          market === MARKETS.H2H
            ? "market_button_focused"
            : "market_buttons_button"
        }
        onClick={() => setMarket(MARKETS.H2H)}
      >
        Final result (1,X,2)
      </button>
    </caption>
    <thead className="bet_buttons_head">
      <tr>
        <th>Event</th>
        <th>Start</th>

        {market === MARKETS.H2H && (
          <>
            <th>1</th>
            <th>X</th>
            <th>2</th>
          </>
        )}
        {market === MARKETS.TOTALS && (
          <>
            <th>over</th>
            <th>under</th>
          </>
        )}
      </tr>
    </thead>
  </>
);
