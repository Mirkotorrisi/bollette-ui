import React from "react";
import "./index.scss";
import { Player } from "../../types";

interface Props {
  player: Player;
  index: number;
  isDealer: boolean;
}
export const PokerPlayer = ({ player, index }: Props) => {
  return (
    <div
      className={`player flex flex-col px-2 py-1 position${
        player.position || index
      }`}
    >
      <div className="flex items-center gap-2">
        <img
          alt={`${player.name} profile pic`}
          className="player__avatar rounded-full w-14 h-14"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdRQkyJnY45wlcKinGmQoY8Qt7lLGye0-rcWO1CXo&s"
        />
        <div className="flex flex-col">
          <h3 className="player__name">{player.name}</h3>
          <p className="player__chips">${player.chips}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {player.hand?.map((c, i) => (
          <div
            className={`player__card ${c.suit.charAt(0)}${c.rank}`}
            key={player.id + i}
          ></div>
        ))}
        <div className="player__action">{player.lastAction}</div>
      </div>
      {!!player.bet && (
        <div className="player__bet flex flex-column items-center">
          <div className="player__bet__chips" /> <span>${player.bet}</span>
        </div>
      )}

      {player.isDealer && <div className="dealer-token" />}
    </div>
  );
};
