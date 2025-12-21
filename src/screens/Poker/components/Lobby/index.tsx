import React from "react";
import { Player } from "../../types";
import "./index.scss";

interface Props {
  tables?: { id: string; players: number }[];
  createTable?: VoidFunction;
  joinTable?: (id: string) => void;
  player?: Player;
  userTablesKeys?: string[];
  onClose?: VoidFunction;
}
export const Lobby = ({
  tables,
  createTable,
  joinTable,
  player,
  userTablesKeys,
  onClose,
}: Props) => {
  return (
    <aside className="lobby flex flex-col gap-4 w-full px-4 border-r h-full relative">
      <button
        className="lg:hidden absolute top-4 right-4 text-white text-2xl opacity-50 hover:opacity-100"
        onClick={onClose}
      >
        ✕
      </button>

      <h2 className="lobby__title">Bollette Poker</h2>
      {player && (
        <>
          <h3 className="lobby__disclaimer">Welcome back,</h3>
          <h3 className="lobby__disclaimer text-white font-bold">
            {player?.name}
          </h3>
          <h3 className="lobby__disclaimer balance">
            Balance: ${player?.chips}
          </h3>
        </>
      )}
      <button className="create-btn" onClick={createTable}>
        New Table
      </button>
      {!!tables?.length && <h3 className="lobby__disclaimer">Open Tables</h3>}
      <div className="table-list">
        {tables?.map((t, index) => (
          <div
            className="flex items-center justify-between table-picker p-2"
            key={`table-picker${index}`}
          >
            <p className="table-picker__label">
              Table <span>#{index + 1}</span>
              <span className="text-[10px] block opacity-50">
                {t.players}/6 players
              </span>
            </p>
            <button
              className="table-picker__button"
              onClick={() => joinTable?.(t.id)}
              disabled={userTablesKeys?.includes(t.id)}
            >
              {userTablesKeys?.includes(t.id) ? "Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
