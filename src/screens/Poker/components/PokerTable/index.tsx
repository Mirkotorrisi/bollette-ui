import React from "react";
import { Table, CHOICE, ChioceObj } from "../../types";
import { PokerPlayer } from "../PokerPlayer";
import { Socket } from "socket.io-client";
import { usePokerActions } from "../../hooks/usePokerActions";
import "./index.scss";
import BetInput from "../BetInput";

interface Props {
  table: Table;
  handleLeave: (id: string) => void;
  socket?: Socket;
  playerId?: string;
}
export const PokerTable = ({ table, socket, playerId, handleLeave }: Props) => {
  const { handleBet, handleCheck, handleFold, handleRaise, handleCall } =
    usePokerActions(socket, playerId);

  const inGamePlayer = table.players.find((p) => p.id === playerId);

  const leaveTable = () => {
    handleLeave(table.id);
  };

  const choices: {
    [key: string]: ChioceObj;
  } = {
    [CHOICE.BET]: {
      label: "Bet",
      action: (amt) => handleBet(table.id, amt!),
    },
    [CHOICE.CALL]: {
      label: "Call",
      action: () => handleCall(table.id),
    },
    [CHOICE.CHECK]: {
      label: "Check",
      action: () => handleCheck(table.id),
    },
    [CHOICE.FOLD]: {
      label: "Fold",
      action: () => handleFold(table.id),
    },
    [CHOICE.RAISE]: {
      label: "Raise",
      action: (amt) => handleRaise(table.id, amt!),
    },
    [CHOICE.ALL_IN]: {
      label: "ALL IN",
      action: () => console.log(table.id, table.bigBlind),
    },
  };

  return (
    <div className="poker-table p-5">
      <h3 className="table-id">{table?.id}</h3>
      <h2 className="pot">Pot: {table?.pot}$</h2>
      {table?.players.map((p, index) => (
        <PokerPlayer
          player={p}
          key={p.id}
          index={index}
          isDealer={p.position === table.dealerPosition}
        />
      ))}
      <div className="flex justify-center items-center gap-3 community">
        {table.communityCards?.map((c, i) => (
          <div
            className={`community__card ${c.suit.charAt(0)}${c.rank}`}
            key={c.suit.charAt(0) + c.rank + i}
          ></div>
        ))}
      </div>
      {/* {table.currentHand?.currentRound} */}

      <div className="flex gap-4 mt-auto actions">
        {inGamePlayer?.isCurrentPlayer &&
          inGamePlayer?.availableChoices.map((choice: CHOICE) =>
            [CHOICE.BET, CHOICE.RAISE].includes(choice) ? (
              <BetInput
                choice={choices[choice]}
                minimum={table.highestBet}
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
