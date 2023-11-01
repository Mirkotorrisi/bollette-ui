import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { usePokerTable } from "./hooks/usePokerTable";
import { Lobby } from "./components/Lobby";
import { PokerTable } from "./components/PokerTable";

interface Props {
  socket: Socket;
}
export const PokerView = ({ socket }: Props) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const selectTable = (id: string) => {
    setSelectedTable(id);
  };

  const {
    player,
    createTable,
    tablesArray,
    joinTable,
    handleLeave,
    userTables,
    userCards,
    actions,
  } = usePokerTable(socket, selectTable);
  const table = userTables.get(selectedTable || "");
  return (
    <section className=" flex-1 flex ">
      <Lobby
        tables={tablesArray}
        player={player}
        joinTable={joinTable}
        createTable={createTable}
      />
      <div className="table_window w-full h-full flex flex-col ">
        <div className="w-full h-full">
          {table && player && (
            <PokerTable
              table={table}
              playerId={player.id}
              {...actions}
              handleLeave={handleLeave}
            />
          )}
        </div>
        <div className="mt-auto flex gap-4">
          {Array.from(userTables || []).map(([id], i) => (
            <button
              className={
                "table-tab px-8 py-2 " + (selectedTable === id ? "active" : "")
              }
              onClick={() => selectTable(id)}
            >
              Table #{i + 1} |{" "}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
