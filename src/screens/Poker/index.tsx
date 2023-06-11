import React from "react";
import "./index.scss";
import { PokerTable } from "./components/PokerTable";
import { usePokerTable } from "./hooks/usePokerTable";
import { useSocket } from "./hooks/useSocket";

const Poker = () => {
  const { socket, player } = useSocket();
  console.log("🚀 ~ file: index.tsx:9 ~ Poker ~ player:", player);
  const {
    handleCreateTable,
    tablesArray,
    handleJoinTable,
    handleLeave,
    userTables,
  } = usePokerTable(socket, player);

  return (
    <div>
      <button className="form__input px-2 py-4" onClick={handleCreateTable}>
        Create table
      </button>
      <p>Tables Array: </p>
      {tablesArray.map((t, index) => (
        <div
          className="flex items-center justify-between table-picker p-2"
          key={`table-picker${index}`}
        >
          <p className="table-picker__label">
            Table <span>#{index}</span> - players online:
            <span>{t.players}</span>{" "}
          </p>
          <button
            className="table-picker__button px-4 py-2"
            onClick={() => handleJoinTable(t.id)}
          >
            Join
          </button>
        </div>
      ))}
      <p>Player: {player?.name}</p>
      <p>Chips: {player?.chips}</p>
      {Array.from(userTables || []).map(([_, table]) => (
        <PokerTable
          key={table.id}
          table={table}
          socket={socket}
          playerId={player?.id}
          handleLeave={handleLeave}
        />
      ))}
    </div>
  );
};

export default Poker;
