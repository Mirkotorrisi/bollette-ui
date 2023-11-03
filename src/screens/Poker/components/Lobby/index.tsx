import React from "react";
import { Player } from "../../types";
import "./index.scss";

interface Props {
  tables?: { id: string; players: number }[];
  createTable?: VoidFunction;
  joinTable?: (id: string) => void;
  player?: Player;
  userTablesKeys?: string[];
}
export const Lobby = ({
  tables,
  createTable,
  joinTable,
  player,
  userTablesKeys,
}: Props) => {
  return (
    <aside className="lobby flex flex-col gap-4 w-3/12 px-4 border-r h-full">
      <h2 className="lobby__title">Bollette Poker room</h2>
      {player && (
        <>
          <h3 className="lobby__disclaimer">Welcome {player?.name}</h3>
          <h3 className="lobby__disclaimer">
            your balance is {player?.chips}$
          </h3>
        </>
      )}
      <button className="form__input px-2 py-4" onClick={createTable}>
        Create a new table
      </button>
      {!!tables?.length && (
        <h3 className="lobby__disclaimer">or join an open table</h3>
      )}
      {tables?.map((t, index) => (
        <div
          className="flex items-center justify-between table-picker p-2"
          key={`table-picker${index}`}
        >
          <p className="table-picker__label">
            Table <span>#{index + 1}</span> - players online:
            <span>{t.players}</span>{" "}
          </p>
          <button
            className="table-picker__button px-4 py-2"
            onClick={() => joinTable?.(t.id)}
            disabled={userTablesKeys?.includes(t.id)}
          >
            Join
          </button>
        </div>
      ))}
    </aside>
  );
};
