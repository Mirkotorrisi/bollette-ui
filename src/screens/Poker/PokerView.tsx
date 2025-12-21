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
  const [showLobby, setShowLobby] = useState(window.innerWidth > 1024);

  const selectTable = (id: string) => {
    setSelectedTable(id);
    if (window.innerWidth <= 1024) setShowLobby(false);
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
    <section className="flex-1 flex bg-[#0a0a0a] overflow-hidden poker-screen-container relative">
      <div
        className={`
        fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-0
        transition-transform duration-300 ease-in-out
        ${
          showLobby
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0"
        }
        w-full lg:w-3/12 h-full
      `}
      >
        <Lobby
          tables={tablesArray}
          player={player}
          joinTable={joinTable}
          createTable={createTable}
          userTablesKeys={userTableKeys}
          onClose={() => setShowLobby(false)}
        />
      </div>

      <div
        className={`table_window flex-1 h-full flex flex-col relative bg-[#0a0a0a] py-10 
        ${showLobby ? "hidden lg:flex" : "flex"}`}
      >
        <div className="w-full h-full flex items-center justify-center lg:p-10 overflow-hidden">
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
            <div className="text-white opacity-20 text-3xl font-bold uppercase tracking-widest text-center px-4">
              Select or join a table
              <br />
              to start playing
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-[150] max-w-[95vw] overflow-x-auto pb-4 scrollbar-hide px-4">
        <button
          className={`table-tab px-6 py-2 whitespace-nowrap ${
            showLobby ? "active" : ""
          }`}
          onClick={() => setShowLobby(!showLobby)}
        >
          <span className="mr-2">🏠</span>
          <span>Lobby</span>
        </button>

        {userTableKeys.length > 0 &&
          Array.from(userTables || []).map(([id, t], i) => {
            const isCurrentPlayer = t.players.find(
              (p) => p.id === player?.id
            )?.isCurrentPlayer;
            return (
              <button
                key={id}
                className={`table-tab px-6 py-2 whitespace-nowrap ${
                  selectedTable === id && !showLobby ? "active" : ""
                } ${isCurrentPlayer ? "alert" : ""}`}
                onClick={() => selectTable(id)}
              >
                <span className="opacity-50 mr-2">#{i + 1}</span>
                <span>{t.id.slice(0, 4)}</span>
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
    </section>
  );
};
