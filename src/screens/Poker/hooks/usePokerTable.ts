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

    socket.on(Actions.BET, (data) => {
      console.log(data);
    });
    socket.on(Actions.ALL_TABLES, (tables) => {
      setTablesArray(tables);
    });
    socket.on(Actions.ALL_USER_TABLES, (userTables) => {
      setUserTables(new Map(userTables));
    });
    socket.on(Actions.FOLD, handleUpdateTable);
    socket.on(Actions.RAISE, handleUpdateTable);
    socket.on(Actions.CALL, handleUpdateTable);
    socket.on(Actions.CHECK, handleUpdateTable);
    socket.on(Actions.JOIN, handleUpdateTable);
    socket.on(Actions.LEAVE, handleUpdateTable);
    socket.on(Actions.GET_TABLE, (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleUpdateTable = (table: Table) => {
    setUserTables(new Map(userTables.set(table.id, table)));
  };

  const handleLeave = (id: string) => {
    if (!player) return;
    socket?.emit(Actions.LEAVE, { tableId: id, playerId: player?.id });
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
