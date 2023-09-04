import React from "react";
import "./index.scss";
import { PokerTable } from "./components/PokerTable";
import { usePokerTable } from "./hooks/usePokerTable";
import NewWindow from "react-new-window";

const Poker = () => {
  const {
    player,
    createTable,
    tablesArray,
    joinTable,
    handleLeave,
    userTables,
    userCards,
    actions,
  } = usePokerTable();

  return (
    <div>
      <button className="form__input px-2 py-4" onClick={createTable}>
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
            onClick={() => joinTable(t.id)}
          >
            Join
          </button>
        </div>
      ))}
      <p>Player: {player?.name}</p>
      <p>Chips: {player?.chips}</p>
      {Array.from(userTables || []).map(([_, table]) => (
        <NewWindow
          features={{ width: 1250, height: 800 }}
          onUnload={() => handleLeave(table.id)}
          onBlock={() => handleLeave(table.id)}
          key={table.id}
        >
          <PokerTable
            key={table.id}
            table={table}
            playerId={player?.id}
            userCards={userCards.get(table.id)}
            handleLeave={handleLeave}
            {...actions}
          />
        </NewWindow>
      ))}
    </div>
  );
};

export default Poker;
