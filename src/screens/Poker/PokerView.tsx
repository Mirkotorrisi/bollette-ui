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
  const userTableKeys = Array.from(userTables.keys());

  return (
    <section className="flex-1 flex bg-[#0a0a0a] overflow-hidden poker-screen-container">
      <Lobby
        tables={tablesArray}
        player={player}
        joinTable={joinTable}
        createTable={createTable}
        userTablesKeys={userTableKeys}
      />
      <div className="table_window w-full h-full flex flex-col relative">
        <div className="w-full h-full flex items-center justify-center p-10 overflow-hidden">
          {table && player ? (
            <PokerTable
              key={table.id}
              table={table}
              playerId={player?.id}
              userCards={userCards.get(table.id)}
              handleLeave={handleLeave}
              {...actions}
            />
          ) : (
            <div className="text-white opacity-20 text-3xl font-bold uppercase tracking-widest text-center">
              Select or join a table
              <br />
              to start playing
            </div>
          )}
        </div>

        {userTableKeys.length > 0 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
            {Array.from(userTables || []).map(([id, t], i) => {
              const isCurrentPlayer = t.players.find(
                (p) => p.id === player?.id
              )?.isCurrentPlayer;
              return (
                <button
                  key={id}
                  className={`table-tab px-6 py-2 ${
                    selectedTable === id ? "active" : ""
                  } ${isCurrentPlayer ? "alert" : ""}`}
                  onClick={() => selectTable(id)}
                >
                  <span className="opacity-50 mr-2">#{i + 1}</span>
                  <span>Table {t.id.slice(0, 4)}</span>
                  {isCurrentPlayer && (
                    <span
                      className="ml-2 animate-pulse"
                      style={{ color: "var(--primary-accent)" }}
                    >
                      ●
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
