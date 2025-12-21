import React from "react";
import "./index.scss";
import { Card, Player } from "../../types";

interface Props {
  player: Player;
  index: number;
  isDealer: boolean;
  userCards?: Card[];
}
export const PokerPlayer = ({ player, index, userCards, isDealer }: Props) => {
  return (
    <div
      className={`player flex flex-col p-1 position${
        player.position || index
      } ${player.isCurrentPlayer ? "active-turn" : ""}`}
    >
      <div className="flex items-center gap-3">
        <img
          alt={`${player.name} profile pic`}
          className="player__avatar rounded-full w-12 h-12"
          src={`/img/${player.name.toLowerCase()}.webp`} // Assuming images exist or fallback to standard
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + player.name;
          }}
        />
        <div className="flex flex-col">
          <h3 className="player__name">{player.name}</h3>
          <p className="player__chips">${player.chips}</p>
        </div>
      </div>

      <div className="player__cards-container">
        {(userCards || player.hand)?.map((c, i) => (
          <div
            className={`player__card ${c.suit.charAt(0)}${c.rank}`}
            key={player.id + i}
          ></div>
        ))}
        {!userCards && !player?.hand?.length && (
          <>
            <div className={`player__card cover`}></div>
            <div className={`player__card cover`}></div>
          </>
        )}
      </div>

      {player.lastAction && (
        <div className="player__action">{player.lastAction}</div>
      )}

      {!!player.bet && (
        <div className="player__bet">
          <div className="player__bet__chips" /> <span>${player.bet}</span>
        </div>
      )}

      {isDealer && <div className="dealer-token" />}
    </div>
  );
};
