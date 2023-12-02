import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Actions, Card, Player, Table } from "../types";

export const usePokerTable = (
  socket: Socket,
  selectTable: (id: string) => void
) => {
  const [player, setPlayer] = useState<Player>();
  const [userTables, setUserTables] = useState<Map<string, Table>>(
    new Map<string, Table>([])
  );
  const [userCards, setUserCards] = useState<Map<string, Card[]>>(
    new Map<string, Card[]>([])
  );
  const [tablesArray, setTablesArray] = useState<
    { id: string; players: number }[]
  >([]);

  const handleUpdateTable = useCallback(
    (action: Actions) => (table: Table) => {
      const position = userTables.get(table.id)?.currentPlayerPosition;
      if (position !== undefined && table.players[position]) {
        table.players[position].lastAction = action;
      }
      setUserTables(new Map(userTables.set(table.id, table)));
    },
    [userTables]
  );

  const handleUpdatePlayers = useCallback(
    (table: Table, playerId: string) => {
      if (playerId === player?.id) return;
      handleUpdateTable(Actions.JOIN)(table);
    },
    [handleUpdateTable, player?.id]
  );

  const getUserCards = useCallback(
    ({ tableId, hand }: { tableId: string; hand: Card[] }) => {
      setUserCards(new Map(userCards.set(tableId, hand)));
    },
    [userCards]
  );

  useEffect(() => {
    socket.on(Actions.SET_PLAYER, (player: Player) => {
      setPlayer(player);
    });
    socket.on(Actions.ALL_TABLES, (tables) => {
      setTablesArray(tables);
    });
    socket.on(Actions.ALL_USER_TABLES, (userTables) => {
      if (userTables?.length) {
        selectTable(userTables[userTables.length - 1][0]);
      }
      setUserTables(new Map(userTables));
    });
    socket.on(Actions.BET, handleUpdateTable(Actions.BET));
    socket.on(Actions.FOLD, handleUpdateTable(Actions.FOLD));
    socket.on(Actions.RAISE, handleUpdateTable(Actions.RAISE));
    socket.on(Actions.CALL, handleUpdateTable(Actions.CALL));
    socket.on(Actions.CHECK, handleUpdateTable(Actions.CHECK));
    socket.on(Actions.JOIN, handleUpdatePlayers);
    socket.on(Actions.LEAVE, handleUpdatePlayers);
    socket.on(Actions.GET_PLAYER_CARDS, getUserCards);
    socket.on(Actions.ASK_FOR_CARDS, (tableId) =>
      socket.emit(Actions.GET_PLAYER_CARDS, tableId)
    );
    // socket.on(Actions.GET_TABLE, (data) => {
    //   console.log(data);
    // });

    return () => {
      [
        Actions.BET,
        Actions.FOLD,
        Actions.CALL,
        Actions.RAISE,
        Actions.CHECK,
        Actions.JOIN,
        Actions.LEAVE,
        Actions.GET_PLAYER_CARDS,
        Actions.ASK_FOR_CARDS,
        Actions.ALL_TABLES,
        Actions.ALL_USER_TABLES,
        Actions.SET_PLAYER,
      ].forEach((action) => socket.off(action));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeave = (id: string) => {
    if (!player) return;
    socket?.emit(Actions.LEAVE, { tableId: id, playerId: player?.id });
    window?.close();
  };

  const joinTable = (tableId: string) => {
    socket?.emit(Actions.JOIN, { tableId, playerId: player?.id });
  };

  const createTable = () => {
    console.log(socket);
    socket?.emit(Actions.CREATE_TABLE, player?.id);
  };

  const bet = (tableId: string, amount: number) => {
    socket?.emit(Actions.BET, { tableId, amount });
  };
  const call = (tableId: string) => {
    socket?.emit(Actions.CALL, tableId);
  };
  const raise = (tableId: string, amount: number) => {
    socket?.emit(Actions.RAISE, { tableId, amount });
  };
  const fold = (tableId: string) => {
    socket?.emit(Actions.FOLD, tableId);
  };
  const check = (tableId: string) => {
    socket?.emit(Actions.CHECK, tableId);
  };

  const actions = {
    bet,
    call,
    check,
    fold,
    raise,
  };

  return {
    player,
    userTables,
    userCards,
    createTable,
    handleLeave,
    tablesArray,
    joinTable,
    actions,
  };
};
