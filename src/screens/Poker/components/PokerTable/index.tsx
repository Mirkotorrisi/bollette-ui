import React from "react";
import { Table, CHOICE, ChioceObj, Card } from "../../types";
import { PokerPlayer } from "../PokerPlayer";
import { Socket } from "socket.io-client";
import { card_image } from "../../assets";
import "./index.scss";
import BetInput from "../BetInput";

type PlayerAction = (id: string) => void;
type PlayerActionWithAmount = (id: string, amt: number) => void;
interface Props {
  table: Table;
  handleLeave: (id: string) => void;
  socket?: Socket;
  playerId?: string;
  userCards?: Card[];
  bet: PlayerActionWithAmount;
  call: PlayerAction;
  check: PlayerAction;
  raise: PlayerActionWithAmount;
  fold: PlayerAction;
}
export const PokerTable = ({
  table,
  playerId,
  handleLeave,
  userCards,
  bet,
  call,
  check,
  raise,
  fold,
}: Props) => {
  const inGamePlayer = table.players.find((p) => p.id === playerId);

  const leaveTable = () => {
    handleLeave(table.id);
  };

  const choices: {
    [key: string]: ChioceObj;
  } = {
    [CHOICE.BET]: {
      label: "Bet",
      action: (amt) => bet(table.id, Math.floor(amt || table.bigBlind)),
    },
    [CHOICE.CALL]: {
      label: "Call",
      action: () => call(table.id),
    },
    [CHOICE.CHECK]: {
      label: "Check",
      action: () => check(table.id),
    },
    [CHOICE.FOLD]: {
      label: "Fold",
      action: () => fold(table.id),
    },
    [CHOICE.RAISE]: {
      label: "Raise",
      action: (amt) =>
        raise(table.id, Math.floor(amt! || table.highestBet * 2)),
    },
    [CHOICE.ALL_IN]: {
      label: "ALL IN",
      action: () => console.log(table.id, table.bigBlind),
    },
  };

  return (
    <div className=" mx-auto w-full relative grid items-center poker-table p-5">
      <h3 className="table-id">{table?.id}</h3>
      <h2 className="pot">Pot: {table?.pot}$</h2>
      {table?.players?.map((p, index) => (
        <PokerPlayer
          player={p}
          key={p.id}
          index={index}
          isDealer={p.position === table.dealerPosition}
          userCards={p.id === playerId ? userCards : undefined}
          showHand={table.isHandOver || table.currentRound === "SHOWDOWN"}
        />
      ))}
      <div className="flex justify-center items-center gap-3 community">
        {table.currentRound !== "PRE_FLOP" &&
          table.communityCards?.map((c, i) => (
            <div
              className="community__card front"
              style={{ backgroundImage: `url(${card_image[c.suit + c.rank]})` }}
              key={c.suit.charAt(0) + c.rank + i}
            ></div>
          ))}
      </div>

      <div className="mx-auto flex gap-4 mt-auto actions">
        {inGamePlayer?.isCurrentPlayer &&
          inGamePlayer?.availableChoices?.map((choice: CHOICE) =>
            [CHOICE.BET, CHOICE.RAISE].includes(choice) ? (
              <BetInput
                choice={choices[choice]}
                minimum={table.highestBet || table.bigBlind}
                maximum={inGamePlayer.chips}
                pot={table.pot}
                key={choice}
              />
            ) : (
              <button
                className="form__input px-2 py-4"
                onClick={() => choices[choice].action()}
                key={choice}
              >
                {choices[choice].label}
              </button>
            )
          )}
        <button
          className="form__input leave-table px-2 py-4"
          onClick={leaveTable}
        >
          Leave Table
        </button>
      </div>
    </div>
  );
};
