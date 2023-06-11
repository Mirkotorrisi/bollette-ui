import React, { MouseEventHandler } from "react";
import { Table, Player, CHOICE } from "../../types";
import NewWindow from "react-new-window";
import { PokerPlayer } from "../PokerPlayer";
import { Socket } from "socket.io-client";
import { usePokerActions } from "../../hooks/usePokerActions";
import "./index.scss";

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
    [key: string]: {
      label: string;
      action: MouseEventHandler<HTMLButtonElement>;
    };
  } = {
    [CHOICE.BET]: {
      label: "Bet",
      action: () => handleBet(table.id, table.blind),
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
      action: () => handleRaise(table.id, table.blind),
    },
    [CHOICE.ALL_IN]: {
      label: "ALL IN",
      action: () => console.log(table.id, table.blind),
    },
  };

  return (
    <NewWindow features={{ width: 1250, height: 800 }} onUnload={leaveTable}>
      <div className="poker-table p-5">
        <h1>Table id {table?.id}</h1>
        <h2>Pot: {table?.currentHand?.pot}$</h2>
        {table?.players?.map((p) => (
          <PokerPlayer player={p} key={p.id} />
        ))}
        {table.currentHand?.communityCards?.map((c) => (
          <div className="card" key={c.rank + c.suit}>
            {c.rank} - {c.suit}
          </div>
        ))}
        {/* {table.currentHand?.currentRound} */}

        <div className="flex gap-4 mt-auto actions">
          {inGamePlayer?.isCurrentPlayer &&
            inGamePlayer?.availableChoices.map((choice: CHOICE) => (
              <button
                className="form__input px-2 py-4"
                onClick={choices[choice].action}
              >
                {choices[choice].label}
              </button>
            ))}
        </div>

        <button className="form__input px-2 py-4" onClick={leaveTable}>
          Leave Table
        </button>
      </div>
    </NewWindow>
  );
};
