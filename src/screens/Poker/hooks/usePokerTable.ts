import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Actions, Player, Table } from "../types";

export const usePokerTable = (socket?: Socket, player?: Player) => {
  const [userTables, setUserTables] = useState<Map<string, Table>>(
    new Map<string, Table>([])
  );

  const [tablesArray, setTablesArray] = useState<
    { id: string; players: number }[]
  >([]);

  useEffect(() => {
    if (!socket) return;

    socket.on(Actions.ALL_TABLES, (tables) => {
      setTablesArray(tables);
    });
    socket.on(Actions.ALL_USER_TABLES, (userTables) => {
      setUserTables(new Map(userTables));
    });
    socket.on(Actions.BET, handleUpdateTable(Actions.BET));
    socket.on(Actions.FOLD, handleUpdateTable(Actions.FOLD));
    socket.on(Actions.RAISE, handleUpdateTable(Actions.RAISE));
    socket.on(Actions.CALL, handleUpdateTable(Actions.CALL));
    socket.on(Actions.CHECK, handleUpdateTable(Actions.CHECK));
    socket.on(Actions.JOIN, handleUpdatePlayers);
    socket.on(Actions.LEAVE, handleUpdatePlayers);
    socket.on(Actions.GET_TABLE, (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleUpdateTable = (action: Actions) => (table: Table) => {
    const position = userTables.get(table.id)?.currentPlayerPosition;
    if (position !== undefined && table.players[position]) {
      table.players[position].lastAction = action;
    }
    setUserTables(new Map(userTables.set(table.id, table)));
  };

  const handleUpdatePlayers = (table: Table, playerId: string) => {
    if (playerId === player?.id) return;
    handleUpdateTable(Actions.JOIN)(table);
  };

  const handleLeave = (id: string) => {
    if (!player) return;
    socket?.emit(Actions.LEAVE, { tableId: id, playerId: player?.id });
    window?.close();
  };

  const handleJoinTable = (tableId: string) => {
    socket?.emit(Actions.JOIN, { tableId, playerId: player?.id });
  };

  const handleCreateTable = () => {
    socket?.emit(Actions.CREATE_TABLE, player?.id);
  };

  return {
    userTables,
    handleCreateTable,
    handleLeave,
    tablesArray,
    handleJoinTable,
  };
};
