import "./index.scss";
import { useState } from "react";
import { Table } from "./Table";
import { Checkout } from "./Checkout";
import { Ranking } from "./Ranking";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { markets } from "../../consts/markets";
import { CHAMPIONSHIPS } from "../../consts";

export const BetList = () => {
  const [championship, setChampionship] = useState(CHAMPIONSHIPS.SERIE_A);
  const [showMarkets, setshowMarkets] = useState(false);
  const { isSmallScreen } = useWindowDimensions();

  return (
    <section className="bet_component_container">
      <h1 className="login_title">{championship}</h1>
      <div className="bet_component">
        <div className={`market_buttons ${isSmallScreen ? "fixed" : ""}`}>
          <div className={isSmallScreen ? (showMarkets ? "show" : "hide") : ""}>
            {markets.map(({ key, label, flag }) => (
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
                {label}
                <img src={`/flags/${flag}`} alt={flag} className="flag_icon" />
              </button>
            ))}
          </div>
        </div>
        {isSmallScreen && (
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

        <Table championship={championship} />
        <Checkout />

        <Ranking />
      </div>
    </section>
  );
};
