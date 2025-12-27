import React from "react";
import { Card, Player } from "../../types";
import { card_image } from "../../assets";
import "./index.scss";

interface Props {
  player: Player;
  index: number;
  isDealer: boolean;
  userCards?: Card[];
  showHand?: boolean;
}
export const PokerPlayer = ({
  player,
  index,
  userCards,
  isDealer,
  showHand,
}: Props) => {
  return (
    <div
      className={`player flex flex-col p-1 position${
        player.position || index
      } ${player.isCurrentPlayer ? "active-turn" : ""}`}
    >
      <div className="flex items-center gap-3">
        <img
          alt={`${player.name} cat avatar`}
          className="player__avatar rounded-full w-16 h-16 object-cover"
          src={`https://cataas.com/cat?${player.id}`}
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
        {(userCards || (showHand ? player.hand : undefined))?.map((c, i) => (
          <div
            className="player__card front"
            key={player.id + (c.suit + c.rank) + i}
            style={{ backgroundImage: `url(${card_image[c.suit + c.rank]})` }}
          ></div>
        ))}
        {!userCards && (!showHand || !player?.hand?.length) && (
          <>
            <div
              className="player__card"
              style={{ backgroundImage: `url(${card_image.cardBack})` }}
            ></div>
            <div
              className="player__card"
              style={{ backgroundImage: `url(${card_image.cardBack})` }}
            ></div>
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
