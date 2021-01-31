import { BetListView } from "../components/betListView";
import { TotalComponent } from "../components/totalComponent";
import { RankingComponent } from "../components/RankingComponent";
import { useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import { marketNames, flags } from "../assets/res.json";
export const BetComponent = () => {
  const [championship, setChampionship] = useState("serie_a");
  const [showMarkets, setshowMarkets] = useState(false);
  const { height, width } = useWindowDimensions();

  return (
    <section className="bet_component_container">
      <h1 className="login_title">{championship}</h1>
      <div className="bet_component">
        <div className={width < 980 ? "market_buttons fixed" : ""}>
          <div className={width < 980 ? (showMarkets ? "show" : "hide") : ""}>
            {Object.keys(marketNames).map((key) => {
              return (
                <button
                  id={key}
                  key={key}
                  className={
                    key === championship
                      ? "market_button_focused"
                      : "market_buttons_button"
                  }
                  onClick={() => setChampionship(key)}
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
        </div>
        {width < 980 && (
          <button
            onClick={() => setshowMarkets(!showMarkets)}
            className="showMarkets"
            style={showMarkets ? { left: 150 } : { left: 0 }}
          >
            <i
              className="fas fa-arrow-left"
              style={showMarkets ? {} : { transform: "rotate(180deg)" }}
            ></i>
          </button>
        )}

        <BetListView champhionsip={championship} />
        <>
          <TotalComponent />
          <RankingComponent />
        </>
      </div>
    </section>
  );
};
