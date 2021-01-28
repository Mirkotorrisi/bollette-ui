import { BetListView } from "../components/betListView";
import { TotalComponent } from "../components/totalComponent";
import { useState } from "react";
import { marketNames, flags } from "../assets/res.json";
export const BetComponent = () => {
  const [marketName, setMarketName] = useState("serie_a");
  return (
    <section className="bet_component_container">
      <h1 className="login_title">{marketName}</h1>
      <div className="bet_component">
        <div className="market_buttons">
          {Object.keys(marketNames).map((key) => {
            return (
              <button
                id={key}
                key={key}
                className={
                  key === marketName
                    ? "market_button_focused"
                    : "market_buttons_button"
                }
                onClick={() => setMarketName(key)}
              >
                {marketNames[key]}{" "}
                <img
                  src={`/flags/${flags[key]}`}
                  alt={flags[key]}
                  className="flag_icon"
                />
              </button>
            );
          })}
        </div>

        <BetListView marketName={marketName} />
        <TotalComponent />
      </div>
    </section>
  );
};
